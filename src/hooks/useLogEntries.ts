import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { isMockMode } from '../lib/mockMode'
import { MOCK_ENTRIES } from '../lib/mockData'
import type { EntryFormValues, LogEntryWithDishes } from '../types'

const ENTRIES_KEY = ['log_entries'] as const

export function useLogEntriesFeed() {
  return useQuery({
    queryKey: ENTRIES_KEY,
    queryFn: async () => {
      if (isMockMode) return MOCK_ENTRIES
      const { data, error } = await supabase
        .from('log_entries')
        .select('*, dishes(*)')
        .order('visit_date', { ascending: false })
      if (error) throw error
      return data as LogEntryWithDishes[]
    },
  })
}

export function useLogEntry(id: string) {
  return useQuery({
    queryKey: [...ENTRIES_KEY, id],
    queryFn: async () => {
      if (isMockMode) return MOCK_ENTRIES.find(e => e.id === id) ?? MOCK_ENTRIES[0]
      const { data, error } = await supabase
        .from('log_entries')
        .select('*, dishes(*)')
        .eq('id', id)
        .single()
      if (error) throw error
      return data as LogEntryWithDishes
    },
  })
}

export function useCreateLogEntry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (values: EntryFormValues) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { dishes, ...entry } = values
      const { data, error } = await supabase
        .from('log_entries')
        .insert({ ...entry, user_id: user.id })
        .select()
        .single()
      if (error) throw error

      if (dishes.length > 0) {
        const { error: dishError } = await supabase.from('dishes').insert(
          dishes.map(d => ({ dish_name: d.dish_name, rating: d.rating, notes: d.notes, log_entry_id: data.id, user_id: user.id }))
        )
        if (dishError) throw dishError
      }

      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ENTRIES_KEY }),
  })
}

export function useUpdateLogEntry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, values }: { id: string; values: EntryFormValues }) => {
      const { dishes, ...entry } = values
      const { error } = await supabase.from('log_entries').update(entry).eq('id', id)
      if (error) throw error

      // Delete all existing dishes and re-insert — simple upsert strategy
      const { error: delError } = await supabase.from('dishes').delete().eq('log_entry_id', id)
      if (delError) throw delError

      if (dishes.length > 0) {
        const { error: dishError } = await supabase.from('dishes').insert(
          dishes.map(d => ({ dish_name: d.dish_name, rating: d.rating, notes: d.notes, log_entry_id: id }))
        )
        if (dishError) throw dishError
      }
    },
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: ENTRIES_KEY })
      qc.invalidateQueries({ queryKey: [...ENTRIES_KEY, id] })
    },
  })
}

export function useDeleteLogEntry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('log_entries').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ENTRIES_KEY }),
  })
}

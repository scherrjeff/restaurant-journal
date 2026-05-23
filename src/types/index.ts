import { z } from 'zod'

// ── Database row types ──────────────────────────────────────────────────────

export interface LogEntry {
  id: string
  user_id: string
  restaurant_name: string
  visit_date: string
  cuisine_type: string | null
  overall_rating: number
  notes: string | null
  occasion: string | null
  would_return: boolean
  created_at: string
  updated_at: string
}

export interface Dish {
  id: string
  log_entry_id: string
  user_id: string
  dish_name: string
  rating: number | null
  notes: string | null
  created_at: string
}

export interface Photo {
  id: string
  log_entry_id: string
  user_id: string
  storage_path: string
  created_at: string
}

export interface LogEntryWithDishes extends LogEntry {
  dishes: Dish[]
}

// ── Zod form schemas ────────────────────────────────────────────────────────

export const DishFormSchema = z.object({
  id: z.string().optional(),
  dish_name: z.string().min(1, 'Dish name is required'),
  rating: z.number().int().min(1).max(5).nullable(),
  notes: z.string().nullable(),
})

export const EntryFormSchema = z.object({
  restaurant_name: z.string().min(1, 'Restaurant name is required'),
  visit_date: z.string().min(1, 'Visit date is required'),
  cuisine_type: z.string().nullable(),
  overall_rating: z.number().int().min(1, 'Rating is required').max(5),
  notes: z.string().nullable(),
  occasion: z.string().nullable(),
  would_return: z.boolean(),
  dishes: z.array(DishFormSchema),
})

export type DishFormValues = z.infer<typeof DishFormSchema>
export type EntryFormValues = z.infer<typeof EntryFormSchema>

// ── Filter state (Phase 2) ──────────────────────────────────────────────────

export interface FilterState {
  cuisine?: string
  minRating?: number
  dateFrom?: string
  dateTo?: string
  wouldReturn?: boolean
}

import { useFieldArray, type UseFormRegister, type UseFormSetValue, type UseFormWatch, type Control } from 'react-hook-form'
import type { EntryFormValues } from '../../types'
import DishForm from './DishForm'

interface Props {
  control: Control<EntryFormValues>
  register: UseFormRegister<EntryFormValues>
  setValue: UseFormSetValue<EntryFormValues>
  watch: UseFormWatch<EntryFormValues>
}

export default function DishList({ control, register, setValue, watch }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: 'dishes' })

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Dishes</span>
        <button
          type="button"
          onClick={() => append({ dish_name: '', rating: null, notes: null })}
          className="text-sm text-orange-500 hover:text-orange-600 font-medium"
        >
          + Add dish
        </button>
      </div>
      {fields.map((field, index) => (
        <DishForm
          key={field.id}
          index={index}
          register={register}
          setValue={setValue}
          watch={watch}
          onRemove={() => remove(index)}
        />
      ))}
    </div>
  )
}

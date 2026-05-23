import type { LogEntryWithDishes } from '../types'

export const MOCK_ENTRIES: LogEntryWithDishes[] = [
  {
    id: 'mock-1',
    user_id: 'mock-user',
    restaurant_name: 'Osteria Francescana',
    visit_date: '2025-04-20',
    cuisine_type: 'Italian',
    overall_rating: 5,
    notes: 'Absolutely stunning. The "Oops, I Dropped the Lemon Tart" is as theatrical as it is delicious. Service was impeccable from start to finish.',
    occasion: 'Date night',
    would_return: true,
    created_at: '2025-04-20T20:00:00Z',
    updated_at: '2025-04-20T20:00:00Z',
    dishes: [
      { id: 'd1', log_entry_id: 'mock-1', user_id: 'mock-user', dish_name: 'Five Ages of Parmigiano Reggiano', rating: 5, notes: 'Mind-bending textures', created_at: '' },
      { id: 'd2', log_entry_id: 'mock-1', user_id: 'mock-user', dish_name: 'Oops I Dropped the Lemon Tart', rating: 5, notes: 'The signature dessert — worth the hype', created_at: '' },
    ],
  },
  {
    id: 'mock-2',
    user_id: 'mock-user',
    restaurant_name: 'Nobu Malibu',
    visit_date: '2025-03-08',
    cuisine_type: 'Japanese',
    overall_rating: 4,
    notes: 'Great ocean view and solid food. The black cod miso is as good as ever. A bit pricey for what it is.',
    occasion: 'With friends',
    would_return: true,
    created_at: '2025-03-08T20:00:00Z',
    updated_at: '2025-03-08T20:00:00Z',
    dishes: [
      { id: 'd3', log_entry_id: 'mock-2', user_id: 'mock-user', dish_name: 'Black Cod Miso', rating: 5, notes: 'Classic for a reason', created_at: '' },
      { id: 'd4', log_entry_id: 'mock-2', user_id: 'mock-user', dish_name: 'Rock Shrimp Tempura', rating: 4, notes: null, created_at: '' },
    ],
  },
  {
    id: 'mock-3',
    user_id: 'mock-user',
    restaurant_name: 'Taco Nazo',
    visit_date: '2025-02-14',
    cuisine_type: 'Mexican',
    overall_rating: 4,
    notes: 'Best street-style tacos in the area. Cash only, tiny spot, always worth the wait.',
    occasion: 'Solo',
    would_return: true,
    created_at: '2025-02-14T12:00:00Z',
    updated_at: '2025-02-14T12:00:00Z',
    dishes: [
      { id: 'd5', log_entry_id: 'mock-3', user_id: 'mock-user', dish_name: 'Al Pastor Tacos (x3)', rating: 5, notes: 'Perfect char on the pork', created_at: '' },
    ],
  },
]

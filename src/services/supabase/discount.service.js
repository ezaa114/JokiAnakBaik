import { supabase } from './client'

export const getDiscounts = async () => {
  const { data, error } = await supabase
    .from('discounts')
    .select('*')

  return { data, error }
}

export const getUserDiscounts = async (userId) => {
  const { data, error } = await supabase
    .from('discounts')
    .select('*')
    .eq('user_id', userId)

  return { data, error }
}

export const addDiscount = async (discountData) => {
  const { data, error } = await supabase
    .from('discounts')
    .insert([discountData])
    .select()

  return { data, error }
}

export const updateDiscount = async (id, updates) => {
  const { data, error } = await supabase
    .from('discounts')
    .update(updates)
    .eq('id', id)
    .select()

  return { data, error }
}

export const deleteDiscount = async (id) => {
  const { error } = await supabase
    .from('discounts')
    .delete()
    .eq('id', id)

  return { error }
}

import { supabase } from './client'

export const getPricing = async () => {
  const { data, error } = await supabase
    .from('pricing')
    .select('*')

  return { data, error }
}

export const addPricing = async (pricingData) => {
  const { data, error } = await supabase
    .from('pricing')
    .insert([pricingData])
    .select()

  return { data, error }
}

export const deletePricing = async (id) => {
  const { error } = await supabase
    .from('pricing')
    .delete()
    .eq('id', id)

  return { error }
}

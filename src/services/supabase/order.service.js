import { supabase } from './client'

export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()

  return { data, error }
}

export const getOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      users (
        username
      ),
      pricing (
        service_name,
        price
      )
    `)

  return { data, error }
}

export const updateOrderStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()

  return { data, error }
}

import { supabase } from './client'

export const uploadFile = async (bucket, path, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true })

  return { data, error }
}

export const deleteFile = async (bucket, path) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  return { error }
}

export const getPublicUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export const listFiles = async (bucket, path = '') => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path)

  return { data, error }
}

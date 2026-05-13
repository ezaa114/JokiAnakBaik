import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((l) => l.split('='))
    .map(([k, v]) => [k, v])
)
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)

console.log('Testing pricing SELECT...')
const selectResult = await supabase.from('pricing').select('*').limit(1)
console.log('selectResult', selectResult)

const payload = { service_name: 'TEST_INSERT_SERVICE', price: 12345, description: 'test' }
console.log('Testing pricing INSERT...')
const insertResult = await supabase.from('pricing').insert([payload]).select()
console.log('insertResult', insertResult)

if (insertResult.data && insertResult.data[0]?.id) {
  const deleteResult = await supabase.from('pricing').delete().eq('id', insertResult.data[0].id)
  console.log('deleteResult', deleteResult)
}

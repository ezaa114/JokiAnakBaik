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

console.log('Testing pricing INSERT with service and no description...')
const payload = { service: 'TEST_INSERT_SERVICE', price: 12345 }
const {data,error} = await supabase.from('pricing').insert([payload]).select()
console.log('insertResult', { data, error })

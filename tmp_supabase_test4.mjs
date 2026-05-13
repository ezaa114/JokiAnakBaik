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
console.log('Testing pricing INSERT with service_name only...')
let payload = { service_name: 'TEST_INSERT_SERVICE', price: 12345 }
let result = await supabase.from('pricing').insert([payload]).select()
console.log('result1', result)
console.log('Testing pricing INSERT with name only...')
payload = { name: 'TEST_INSERT_SERVICE', price: 12345 }
result = await supabase.from('pricing').insert([payload]).select()
console.log('result2', result)
console.log('Testing pricing INSERT with title only...')
payload = { title: 'TEST_INSERT_SERVICE', price: 12345 }
result = await supabase.from('pricing').insert([payload]).select()
console.log('result3', result)

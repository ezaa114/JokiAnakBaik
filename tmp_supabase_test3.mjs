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
const { data, error } = await supabase
  .from('information_schema.columns')
  .select('column_name')
  .eq('table_name', 'pricing')
  .order('column_name', { ascending: true })
console.log({ data, error })

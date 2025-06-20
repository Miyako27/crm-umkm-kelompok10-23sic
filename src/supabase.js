import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://soeubueecdlbkwospmla.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZXVidWVlY2RsYmt3b3NwbWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNzc4ODcsImV4cCI6MjA2NTk1Mzg4N30.B8M2mqkX1K_5DpT4QDx9UZvQLe3qpcBji3Wyxj0w0WA'
export const supabase = createClient(supabaseUrl, supabaseKey)

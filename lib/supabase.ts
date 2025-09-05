import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Função para salvar um novo interessado
export async function saveInterestedUser(data: {
  name: string
  email: string
  whatsapp: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}) {
  const insertData: any = {
    name: data.name,
    email: data.email,
    whatsapp: data.whatsapp,
    created_at: new Date().toISOString()
  }

  // Adicionar campos UTM se existirem
  if (data.utm_source) insertData.utm_source = data.utm_source
  if (data.utm_medium) insertData.utm_medium = data.utm_medium
  if (data.utm_campaign) insertData.utm_campaign = data.utm_campaign
  if (data.utm_term) insertData.utm_term = data.utm_term
  if (data.utm_content) insertData.utm_content = data.utm_content

  const { error } = await supabase
    .from('interested_users')
    .insert([insertData])

  if (error) {
    console.error('Erro ao salvar no Supabase:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

// Função para buscar todos os interessados
export async function getInterestedUsers() {
  const { data, error } = await supabase
    .from('interested_users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar do Supabase:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

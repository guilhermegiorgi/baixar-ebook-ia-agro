// Função para extrair parâmetros UTM da URL
export function getUTMParams(): {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
} {
  if (typeof window === 'undefined') {
    return {}
  }

  const urlParams = new URLSearchParams(window.location.search)
  const utm: any = {}

  // Extrair parâmetros UTM
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  
  utmParams.forEach(param => {
    const value = urlParams.get(param)
    if (value) {
      utm[param] = value
    }
  })

  return utm
}

// Função para criar URL com UTM
export function createUTMUrl(baseUrl: string, utm: {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}): string {
  const url = new URL(baseUrl)
  const params = new URLSearchParams(url.search)

  // Adicionar parâmetros UTM
  Object.entries(utm).forEach(([key, value]) => {
    if (value) {
      params.set(key, value)
    }
  })

  url.search = params.toString()
  return url.toString()
}

// Função para salvar UTM no localStorage (para persistir entre páginas)
export function saveUTMToLocalStorage(utm: {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}): void {
  if (typeof window === 'undefined') return

  localStorage.setItem('utm_params', JSON.stringify(utm))
}

// Função para obter UTM do localStorage
export function getUTMFromStorage(): {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
} {
  if (typeof window === 'undefined') return {}

  try {
    const stored = localStorage.getItem('utm_params')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

// Hook React para usar UTM tracking - separado em arquivo de client component
// Importe este hook apenas em Client Components
export { useUTMTracking } from './utm-tracking-client'

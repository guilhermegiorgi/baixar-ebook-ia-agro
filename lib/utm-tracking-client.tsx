"use client"

import { useState, useEffect } from 'react'
import { getUTMParams, getUTMFromStorage, saveUTMToLocalStorage } from './utm-tracking'

export function useUTMTracking() {
  const [utmParams, setUTMParams] = useState<ReturnType<typeof getUTMParams>>(() => {
    // Tentar obter da URL primeiro
    const urlParams = getUTMParams()
    if (Object.keys(urlParams).length > 0) {
      saveUTMToLocalStorage(urlParams)
      return urlParams
    }
    
    // Se não tiver na URL, tentar do localStorage
    return getUTMFromStorage()
  })

  useEffect(() => {
    // Verificar se há UTM na URL que não está no localStorage
    const urlParams = getUTMParams()
    const storedParams = getUTMFromStorage()
    
    const hasNewUTM = Object.keys(urlParams).some((key) => 
      (urlParams as any)[key] && (!(storedParams as any)[key] || (storedParams as any)[key] !== (urlParams as any)[key])
    )

    if (hasNewUTM) {
      saveUTMToLocalStorage(urlParams)
      setUTMParams(urlParams)
    }
  }, [])

  return utmParams
}

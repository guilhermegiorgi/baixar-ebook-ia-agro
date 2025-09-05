"use client"
import clsx from "clsx"
import type React from "react"
import { useRef, useState, useEffect } from "react"
import { useUTMTracking } from "@/lib/utm-tracking-client"
import { User, Mail, Phone } from "lucide-react"

type EbookFormData = {
  name: string
  email: string
  whatsapp: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

type EbookForm = {
  formAction?: (data: EbookFormData) => Promise<{ success: true } | { success: false; error: string }>
  buttonCopy: {
    success: string
    idle: string
    loading: string
  }
}

type State = "idle" | "loading" | "success" | "error"

const STATES: Record<State, State> = {
  idle: "idle",
  loading: "loading",
  success: "success",
  error: "error",
}

export function EbookForm({ formAction, buttonCopy }: EbookForm) {
  const [state, setState] = useState<State>(STATES.idle)
  const [error, setError] = useState<string>()
  const utmData = useUTMTracking()
  const [formData, setFormData] = useState<EbookFormData>({
    name: "",
    email: "",
    whatsapp: "",
    ...utmData
  })
  const errorTimeout = useRef<NodeJS.Timeout | null>(null)

  // Auto-reset success state back to idle after 3 seconds
  useEffect(() => {
    if (state === STATES.success) {
      const resetTimeout = setTimeout(() => {
        setState(STATES.idle)
      }, 3000)

      return () => clearTimeout(resetTimeout)
    }
  }, [state])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (state === STATES.success || state === STATES.loading) return

    // Validação básica
    if (!formData.name.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      setState(STATES.error)
      setError("Por favor, preencha todos os campos")
      errorTimeout.current = setTimeout(() => {
        setError(undefined)
        setState(STATES.idle)
      }, 3000)
      return
    }

    if (errorTimeout.current) {
      clearTimeout(errorTimeout.current)
      setError(undefined)
      setState(STATES.idle)
    }

    if (formAction && typeof formAction === "function") {
      try {
        setState(STATES.loading)
        const result = await formAction(formData)

        if (result.success) {
          setState(STATES.success)
          setFormData({ name: "", email: "", whatsapp: "" })
        } else {
          setState(STATES.error)
          setError(result.error)
          errorTimeout.current = setTimeout(() => {
            setError(undefined)
            setState(STATES.idle)
          }, 3000)
        }
      } catch (error) {
        setState(STATES.error)
        setError("Erro ao enviar formulário. Tente novamente.")
        console.error(error)
        errorTimeout.current = setTimeout(() => {
          setError(undefined)
          setState(STATES.idle)
        }, 3000)
      }
    }
  }

  const isSubmitted = state === "success"
  const inputDisabled = state === "loading"

  const handleInputChange = (field: keyof EbookFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Atualizar UTM quando mudar
  useEffect(() => {
    setFormData(prev => ({ ...prev, ...utmData }))
  }, [utmData])

  return (
    <form className="flex flex-col gap-4 w-full relative" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Seu nome completo"
            value={formData.name}
            className={clsx(
              "w-full text-sm pl-10 pr-4 py-3 h-12 bg-gray-11/5 rounded-md text-gray-12 placeholder:text-gray-9 border border-gray-11/10",
              "focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30",
              "transition-all duration-200",
            )}
            disabled={inputDisabled}
            onChange={(e) => handleInputChange("name", e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={formData.email}
            className={clsx(
              "w-full text-sm pl-10 pr-4 py-3 h-12 bg-gray-11/5 rounded-md text-gray-12 placeholder:text-gray-9 border border-gray-11/10",
              "focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30",
              "transition-all duration-200",
            )}
            disabled={inputDisabled}
            onChange={(e) => handleInputChange("email", e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Phone className="w-4 h-4" />
          </div>
          <input
            type="tel"
            placeholder="WhatsApp (com DDD)"
            value={formData.whatsapp}
            className={clsx(
              "w-full text-sm pl-10 pr-4 py-3 h-12 bg-gray-11/5 rounded-md text-gray-12 placeholder:text-gray-9 border border-gray-11/10",
              "focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30",
              "transition-all duration-200",
            )}
            disabled={inputDisabled}
            onChange={(e) => handleInputChange("whatsapp", e.target.value)}
            autoComplete="tel"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={inputDisabled}
        className={clsx(
          "w-full h-12 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2",
          "disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none disabled:shadow-md",
          {
            "from-green-700 to-green-800": state === "loading",
            "from-green-600 to-green-700": state === "success",
          },
        )}
      >
        {state === "loading" ? (
          <>
            <Loading />
            <span className="text-xs">{buttonCopy.loading}</span>
          </>
        ) : isSubmitted ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{buttonCopy.success}</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{buttonCopy.idle}</span>
          </>
        )}
      </button>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}
    </form>
  )
}

const Loading = () => <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />

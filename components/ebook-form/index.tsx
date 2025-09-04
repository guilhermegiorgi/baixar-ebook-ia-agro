"use client"
import clsx from "clsx"
import type React from "react"
import { useRef, useState, useEffect } from "react"

type EbookFormData = {
  name: string
  email: string
  whatsapp: string
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
  const [formData, setFormData] = useState<EbookFormData>({
    name: "",
    email: "",
    whatsapp: "",
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

  return (
    <form className="flex flex-col gap-4 w-full relative" onSubmit={handleSubmit}>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Seu nome completo"
          value={formData.name}
          className={clsx(
            "w-full text-sm px-4 py-3 h-12 bg-gray-11/5 rounded-xl text-gray-12 placeholder:text-gray-9 border border-gray-11/10",
            "focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30",
            "transition-all duration-200",
          )}
          disabled={inputDisabled}
          onChange={(e) => handleInputChange("name", e.target.value)}
          autoComplete="name"
        />

        <input
          type="email"
          placeholder="Seu melhor e-mail"
          value={formData.email}
          className={clsx(
            "w-full text-sm px-4 py-3 h-12 bg-gray-11/5 rounded-xl text-gray-12 placeholder:text-gray-9 border border-gray-11/10",
            "focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30",
            "transition-all duration-200",
          )}
          disabled={inputDisabled}
          onChange={(e) => handleInputChange("email", e.target.value)}
          autoComplete="email"
        />

        <input
          type="tel"
          placeholder="WhatsApp (com DDD)"
          value={formData.whatsapp}
          className={clsx(
            "w-full text-sm px-4 py-3 h-12 bg-gray-11/5 rounded-xl text-gray-12 placeholder:text-gray-9 border border-gray-11/10",
            "focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/30",
            "transition-all duration-200",
          )}
          disabled={inputDisabled}
          onChange={(e) => handleInputChange("whatsapp", e.target.value)}
          autoComplete="tel"
        />
      </div>

      <button
        type="submit"
        disabled={inputDisabled}
        className={clsx(
          "w-full h-12 px-6 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl",
          "transition-all duration-200 flex items-center justify-center gap-2",
          "disabled:cursor-not-allowed disabled:opacity-70",
          {
            "bg-green-700": state === "loading",
            "bg-green-600": state === "success",
          },
        )}
      >
        {state === "loading" ? (
          <>
            {buttonCopy.loading}
            <Loading />
          </>
        ) : isSubmitted ? (
          buttonCopy.success
        ) : (
          buttonCopy.idle
        )}
      </button>

      {error && <p className="text-xs text-red-500 text-center mt-2 px-2">{error}</p>}
    </form>
  )
}

const Loading = () => <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />

"use server"

type EbookFormData = {
  name: string
  email: string
  whatsapp: string
}

export async function sendEbook(data: EbookFormData): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || "http://localhost:3000"}/api/send-ebook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Erro ao enviar e-book. Tente novamente.",
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Erro ao enviar formulário:", error)
    return {
      success: false,
      error: "Erro de conexão. Verifique sua internet e tente novamente.",
    }
  }
}

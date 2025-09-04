import { EbookForm } from "@/components/ebook-form"
import { WaitlistWrapper } from "@/components/box"
import type { Metadata } from "next"
import Image from "next/image"

export const dynamic = "force-static"

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Ebook Gratuito: IA no Agronegócio",
    description:
      "Descubra como a Inteligência Artificial está revolucionando o agronegócio. Baixe nosso ebook gratuito e fique por dentro das principais tendências e aplicações práticas.",
    openGraph: {
      type: "website",
      title: "Ebook Gratuito: IA no Agronegócio",
      description: "Descubra como a IA está revolucionando o agronegócio.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Ebook Gratuito: IA no Agronegócio",
      description: "Descubra como a IA está revolucionando o agronegócio.",
    },
  }
}

export default async function Home() {
  return (
    <WaitlistWrapper>
      {/* Heading */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <Image
            src="/GGAILABS_HORIZINTAL_FINAL.svg"
            alt="GGAILABS"
            width={120}
            height={40}
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/GGAILABS_HORIZINTAL_FINAL_BRANCO.svg"
            alt="GGAILABS"
            width={120}
            height={40}
            className="h-8 w-auto hidden dark:block"
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-12 text-balance leading-tight">
          Inteligência Artificial no Agronegócio
        </h1>

        <p className="text-lg text-slate-10 text-balance max-w-md mx-auto leading-relaxed">
          Descubra como a IA está revolucionando a agricultura moderna e transformando a produtividade no campo
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-sm">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-11">Casos práticos reais</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-11">Tecnologias emergentes</span>
          </div>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-11">Guia de implementação</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-11/10">
          <h3 className="text-lg font-semibold text-slate-12 mb-2 text-center">Receba o Ebook Gratuitamente</h3>
          <p className="text-sm text-slate-10 mb-6 text-center">
            Preencha seus dados e receba o material completo no seu e-mail
          </p>

          <EbookForm
            buttonCopy={{
              idle: "Baixar E-book Gratuito",
              success: "✓ E-book enviado!",
              loading: "Enviando...",
            }}
            formAction={async (data) => {
              try {
                const response = await fetch("/api/send-ebook", {
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
            }}
          />

          <p className="text-xs text-slate-9 text-center mt-4">Seus dados estão seguros. Não enviamos spam.</p>
        </div>
      </div>
    </WaitlistWrapper>
  )
}

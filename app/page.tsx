import { EbookForm } from "@/components/ebook-form"
import { WaitlistWrapper } from "@/components/box"
import { sendEbook } from "@/lib/actions/send-ebook"
import type { Metadata } from "next"
import Image from "next/image"
import { headers } from "next/headers"
import "server-only"

export const dynamic = "force-static"

export const generateMetadata = async (): Promise<Metadata> => ({
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
})

export default async function Home() {
  return (
    <WaitlistWrapper className="!py-4">
      {/* respiro lateral extra para não encostar nas bordas do wrapper */}
      <div className="w-full px-6 lg:px-10">
        {/* 1 col → empilha; em lg vira 2 colunas. Nada de corte em md. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,340px)] items-start gap-6 lg:gap-8">
          {/* Coluna de texto */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start mb-2">
              <Image
                src="/GGAILABS_HORIZINTAL_FINAL.svg"
                alt="GGAILABS"
                width={120}
                height={40}
                className="h-7 w-auto dark:hidden"
              />
              <Image
                src="/GGAILABS_HORIZINTAL_FINAL_BRANCO.svg"
                alt="GGAILABS"
                width={120}
                height={40}
                className="h-7 w-auto hidden dark:block"
              />
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-slate-12 leading-tight tracking-tight">
              Inteligência Artificial no Agronegócio
            </h1>

            <p className="mt-2 text-base lg:text-lg text-slate-10 leading-snug max-w-xl lg:max-w-none mx-auto lg:mx-0">
              Descubra como a IA está revolucionando a agricultura moderna e transformando a produtividade no campo.
            </p>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-slate-11">Casos práticos</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-slate-11">Tecnologias</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-slate-11">Guia de aplicação</span>
              </div>
            </div>
          </div>

          {/* Coluna do formulário */}
          <div className="w-full lg:justify-self-end lg:mr-2">
            <div className="rounded-2xl border border-gray-11/10 bg-white/5 backdrop-blur-sm p-4 lg:p-5">
              <h3 className="text-base lg:text-lg font-semibold text-slate-12 mb-1 text-center lg:text-left">
                Baixe o e-book grátis
              </h3>
              <p className="text-xs lg:text-sm text-slate-10 mb-3 text-center lg:text-left">
                Preencha seus dados e receba no seu e-mail.
              </p>

              <EbookForm
                buttonCopy={{
                  idle: "Quero meu e-book",
                  loading: "Enviando...",
                  success: "E-book enviado! 🚀",
                }}
                formAction={sendEbook}
              />

              <p className="text-[11px] text-slate-9 mt-3 text-center lg:text-left">
                Seus dados estão seguros. Sem spam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </WaitlistWrapper>
  )
}

import { EbookForm } from "@/components/ebook-form"
import { WaitlistWrapper } from "@/components/box"
import { sendEbook } from "@/lib/actions/send-ebook"
import type { Metadata } from "next"
import Image from "next/image"
import "server-only"

export const dynamic = "force-static"

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Ebook Gratuito: IA no Agronegócio",
  description:
    "Descubra como a Inteligência Artificial está revolucionando o agronegócio. Baixe nosso ebook gratuito e fique por dentro das principais tendências e aplicações práticas.",
  openGraph: { type: "website", title: "Ebook Gratuito: IA no Agronegócio", description: "Descubra como a IA está revolucionando o agronegócio." },
  twitter: { card: "summary_large_image", title: "Ebook Gratuito: IA no Agronegócio", description: "Descubra como a IA está revolucionando o agronegócio." },
})

export default async function Home() {
  return (
    <WaitlistWrapper className="!py-2">
      <div className="w-full mx-auto max-w-[940px] px-6 lg:px-11 text-center">
        {/* HEADER */}
        <header className="text-center mb-3">
          <h1 className="text-3xl lg:text-[2.5rem] font-bold text-slate-12 leading-tight tracking-tight text-balance">
            Inteligência Artificial no Agronegócio
          </h1>
        </header>

        {/* TEXTO + CHIPS */}
        <section className="text-pretty max-w-[720px]">
          <p className="text-base lg:text-sm-2.5 text-slate-11 leading-relaxed">
            Descubra como a IA pode revolucionar a agricultura moderna e transformar a produtividade no campo.
          </p>
          <ul className="mt-4 mx-auto flex flex-wrap items-center justify-center gap-11">
            <li className="inline-flex h-7 items-center justify-center gap-0 rounded-full border border-white/10 bg-white/5 px-4 text-sm leading-none text-slate-11">
              <span className="block h-0 w-0 rounded-full bg-green-500" />
              <span className="whitespace-nowrap">Casos práticos</span>
            </li>

            <li className="inline-flex h-7 items-center justify-center gap-0 rounded-full border border-white/10 bg-white/5 px-4 text-sm leading-none text-slate-11">
              <span className="block h-0 w-0 rounded-full bg-green-500" />
              <span className="whitespace-nowrap">Tecnologias</span>
            </li>

            <li className="inline-flex h-7 items-center justify-center gap-0 rounded-full border border-white/10 bg-white/5 px-4 text-sm leading-none text-slate-11">
              <span className="block h-0 w-0 rounded-full bg-green-500" />
              <span className="whitespace-nowrap">Guia de aplicação</span>
            </li>
          </ul>

        </section>

        {/* FORM — centralizado */}
        <section className="mt-3 lg:mt-6 flex justify-center">
          <div className="w-full max-w-[400px] mx-auto">
            <div className="rounded-2xl border border-gray-11/10 bg-white/5 backdrop-blur-sm p-3 shadow-xl">
              <h3 className="text-base lg:text-lg font-semibold text-slate-12 mb-1.5 text-center">
                Baixe o E-book Gratuito
              </h3>
              <p className="text-sm text-slate-11 leading-snug mb-3 text-center p-1">
                Preencha seus dados e receba o material no seu e-mail
              </p>

              <div className="
                [&_form]:space-y-3 sm:[&_form]:space-y-0
                [&_input]:h-10 sm:[&_input]:h-8 [&_input]:py-2 [&_input]:text-sm
                [&_input]:rounded-md [&_input]:border [&_input]:border-gray-300
                [&_input]:focus:ring-2 [&_input]:focus:ring-blue-500 [&_input]:focus:border-transparent
                [&_button]:h-11 sm:[&_button]:h-9 [&_button]:text-sm
                [&_button]:rounded-md [&_button]:bg-blue-600 [&_button]:text-white
                [&_button]:hover:bg-blue-700 [&_button]:focus:outline-none [&_button]:focus:ring-2 [&_button]:focus:ring-blue-500
                [&_button]:disabled:opacity-50 [&_button]:disabled:cursor-not-allowed
                [&_svg]:w-4 [&_svg]:h-4
              ">
                <EbookForm
                  buttonCopy={{ idle: 'Baixar E-book Agora', loading: 'Enviando...', success: '✓ E-book enviado!' }}
                  formAction={sendEbook}
                />
              </div>

              <div className="pt-3 border-t border-gray-11/10">
                <p className="text-xs text-slate-10 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Seus dados estão seguros. Não enviamos spam.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </WaitlistWrapper>
  )
}

import { basehub } from "basehub"
import { WaitlistWrapper } from "@/components/box"
import { Alex_Brush } from "next/font/google"
import clsx from "clsx"
import type { Metadata } from "next"
import "../../basehub.config"

const font = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
})

export const dynamic = "force-static"
export const revalidate = 30

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await basehub().query({
    settings: {
      metadata: {
        titleTemplate: true,
        defaultTitle: true,
        defaultDescription: true,
        favicon: {
          url: true,
        },
        ogImage: {
          url: true,
        },
      },
    },
  })
  return {
    title: {
      template: data.settings.metadata.titleTemplate,
      default: data.settings.metadata.defaultTitle,
    },
    description: data.settings.metadata.defaultDescription,
    openGraph: {
      type: "website",
      images: [data.settings.metadata.ogImage.url],
    },
    twitter: {
      card: "summary_large_image",
      images: [data.settings.metadata.ogImage.url],
    },
    icons: [data.settings.metadata.favicon.url],
  }
}

export default async function Manifesto() {
  return (
    <WaitlistWrapper className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
        {/* Conteúdo do manifesto à esquerda */}
        <div className="text-slate-11 [&>p]:leading-relaxed [&>p:not(:last-child)]:mb-4 text-pretty text-start pr-8">
          <p className="text-lg">
            A agricultura sempre foi transformação: sementes viram alimento, solo vira produtividade, conhecimento vira inovação. Hoje, a inteligência artificial acelera esse ciclo, não como promessa distante, mas como ferramenta prática para quem decide o campo todos os dias.
          </p>

          <p className="text-lg">
            Sou Engenheiro Agrônomo, paulistano de origem, mato-grossense de coração. Há 18 anos conecto tecnologia ao agro, do talhão ao sistema. Essa vivência me mostrou, na prática, como dados bem coletados e algoritmos bem aplicados mudam resultado de safra, custo e decisão.
          </p>

          <p className="text-lg">
            O agronegócio é tradição, sim, mas é também o maior laboratório de inovação do mundo real. Cada sensor instalado, cada linha de código e cada análise feita nos aproxima de uma agricultura mais eficiente, sustentável e inteligente.
          </p>

          <p className="text-lg">
            Este e-book não é só conteúdo técnico. É um convite para enxergar e aplicar o que já está disponível: IA integrada à rotina, do planejamento ao pós-colheita, em soluções simples, úteis e mensuráveis.
          </p>

          <p className="text-lg">
            A revolução digital no campo já está em curso e não espera calendário agrícola. Quem se move agora lidera o próximo ciclo.
            <br />
            <strong className="text-slate-12 text-xl">Está pronto para ser protagonista dessa transformação?</strong>
          </p>

          {/* Assinatura */}
          <div className="mt-8 flex flex-col gap-0.5 items-start">
            <p className={clsx("text-slate-12 text-4xl font-medium italic transform -rotate-3", font.className)}>
              Guilherme Giorgi
            </p>
            <p className="text-slate-11 text-sm font-medium">
              Engenheiro Agrônomo{" "}
              <span className="text-slate-10 text-xs">Especialista em Agricultura Digital e IA</span>
            </p>
          </div>
        </div>

        {/* Imagem do Guilherme à direita */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <img
              src="/guilherme.png"
              alt="Guilherme Giorgi no campo"
              className="w-full max-w-xl h-auto rounded-2xl shadow-2xl border-4 border-white/10"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            />
            {/* Decorativo overlay */}
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </WaitlistWrapper>
  )
}

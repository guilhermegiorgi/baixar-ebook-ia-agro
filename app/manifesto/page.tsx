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
        favicon: { url: true },
        ogImage: { url: true },
      },
    },
  })
  return {
    title: { template: data.settings.metadata.titleTemplate, default: data.settings.metadata.defaultTitle },
    description: data.settings.metadata.defaultDescription,
    openGraph: { type: "website", images: [data.settings.metadata.ogImage.url] },
    twitter: { card: "summary_large_image", images: [data.settings.metadata.ogImage.url] },
    icons: [data.settings.metadata.favicon.url],
  }
}

export default async function Manifesto() {
  return (
    <WaitlistWrapper className="max-w-4xl mx-auto !py-0">
      <div className="flex flex-col items-start gap-6 w-full px-0 py-0">
        {/* Texto principal */}
        <div className="text-slate-10 text-justify [&>p]:leading-tight [&>p:not(:last-child)]:mb-4 text-pretty text-left w-full">
          <p className="text-base">
            A agricultura sempre foi transformação: sementes viram alimento, solo vira produtividade, conhecimento vira
            inovação. Hoje, a inteligência artificial acelera esse ciclo, não como promessa distante, mas como ferramenta
            prática para quem decide o campo todos os dias.
          </p>
          <p className="text-base">
            Sou Engenheiro Agrônomo, paulistano de origem, mato-grossense de coração. Há 18 anos conecto tecnologia ao
            agro, do talhão ao sistema. Essa vivência me mostrou, na prática, como dados bem coletados e algoritmos bem
            aplicados mudam resultado de safra, custo e decisão.
          </p>
          <p className="text-base">
            O agronegócio é tradição, sim, mas é também o maior laboratório de inovação do mundo real. Cada sensor
            instalado, cada linha de código e cada análise feita nos aproxima de uma agricultura mais eficiente,
            sustentável e inteligente.
          </p>
          <p className="text-base">
            Este e-book não é só conteúdo técnico. É um convite para enxergar e aplicar o que já está disponível: IA
            integrada à rotina, do planejamento ao pós-colheita, em soluções simples, úteis e mensuráveis.
          </p>
        </div>

        {/* Bloco final: texto + assinatura (esq) / imagem (dir) */}
        <section className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-3 items-start">
          {/* Coluna esquerda */}
          <div className="text-pretty [&>p]:leading-tight [&>p]:text-justify [&>p:not(:last-child)]:mb-3">
            <p className="text-base text-slate-10 text-justify">
              A revolução digital no campo já está em curso e não espera calendário agrícola. Quem se move agora lidera o
              próximo ciclo.
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-12">
              Está pronto para ser protagonista dessa transformação?
            </p>

            {/* Assinatura */}
            <div className="mt-5 flex items-center gap-4">
              <div className="text-left">
                <p className={clsx("text-slate-12 text-4xl font-medium italic", font.className)}>
                  Guilherme &nbsp;Giorgi
                </p>
                <p className="text-slate-11 text-xs font-medium">
                  Engenheiro Agrônomo
                  <span className="text-slate-10 text-xs block">Especialista em Agricultura Digital e IA</span>
                </p>
              </div>
            </div>
          </div>

          {/* Coluna direita: imagem grande */}
          <div className="mx-auto md:ml-auto w-[200px] md:w-[220px] lg:w-[190px] -mt-2 md:-mt-6 lg:-mt-9">
            <img src="/guilherme.png" alt="Guilherme Giorgi" className="w-full h-auto border-0 shadow-none rounded-none" />
          </div>
        </section>
      </div>
    </WaitlistWrapper>
  )
}

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
    <WaitlistWrapper>
      <div className="flex flex-col gap-10">
        <div className="text-slate-11 [&>p]:tracking-tight [&>p]:leading-[1.6] [&>p:not(:last-child)]:mb-3 text-pretty text-start">
          <p>
            A agricultura sempre foi sobre transformação. Transformar sementes em alimentos, terra em produtividade,
            conhecimento em inovação. Hoje, vivemos um momento único onde a inteligência artificial se torna nossa
            aliada nessa jornada milenar.
          </p>

          <p>
            Como Engenheiro Agrônomo, paulistano de origem e mato-grossense de coração, dediquei os últimos 18 anos
            explorando como a tecnologia pode revolucionar cada etapa do processo produtivo. Das experiências que vão da
            terra à mesa, construí uma visão pioneira sobre o potencial transformador da IA na agricultura.
          </p>

          <p>
            Acredito que o agronegócio não é apenas tradição - é terreno fértil para inovação e impacto global. Cada
            dado coletado, cada algoritmo aplicado, cada solução implementada nos aproxima de uma agricultura mais
            eficiente, sustentável e inteligente.
          </p>

          <p>
            Este e-book representa mais que conhecimento técnico. É um convite para enxergar o futuro que já começou,
            onde inteligência artificial e agricultura se unem para alimentar o mundo de forma mais inteligente. Juntos,
            podemos semear o amanhã que queremos colher.
          </p>

          <p>
            A revolução digital no campo não é uma possibilidade distante - é uma realidade que está transformando
            fazendas ao redor do mundo. E você pode fazer parte dessa transformação.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-0.5 items-start">
            <p className={clsx("text-slate-12 text-4xl font-medium italic transform -rotate-12", font.className)}>
              Guilherme Giorgi
            </p>
            <p className="text-slate-11 text-sm font-medium">
              Engenheiro Agrônomo{" "}
              <span className="text-slate-10 text-xs">Especialista em Agricultura Digital e IA</span>
            </p>
          </div>
        </div>
      </div>
    </WaitlistWrapper>
  )
}

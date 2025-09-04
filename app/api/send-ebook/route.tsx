import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { nome, email, whatsapp } = await request.json()

    // Validação básica
    if (!nome || !email) {
      return NextResponse.json({ error: "Nome e email são obrigatórios" }, { status: 400 })
    }

    // Log dos dados para acompanhamento (já que não temos banco)
    console.log("[EBOOK] Novo interessado:", {
      nome,
      email,
      whatsapp,
      timestamp: new Date().toISOString(),
    })

    // Enviar ebook por email
    const { data, error } = await resend.emails.send({
      from: "mailing.ggailabs.com", // Substitua pelo seu domínio verificado
      to: [email],
      subject: "🤖 Seu E-book: IA no Agronegócio está aqui!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Olá, ${nome}!</h2>
          
          <p>Obrigado pelo seu interesse em <strong>IA no Agronegócio</strong>!</p>
          
          <p>Conforme prometido, segue em anexo seu e-book gratuito com insights valiosos sobre como a Inteligência Artificial está transformando o setor agrícola.</p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #16a34a; margin-top: 0;">📚 O que você vai encontrar:</h3>
            <ul style="color: #374151;">
              <li>Aplicações práticas dos principais serviços de IA e seu potencial uso no Agro.</li>
              <li>Tendências e futuro da agricultura digital</li>
              <li>Ferramentas e tecnologias disponíveis</li>
            </ul>
          </div>
          
          <p>Esperamos que este material seja útil para sua jornada na agricultura digital!</p>
          
          <p style="margin-top: 30px;">
            Atenciosamente,<br>
            <strong>Guilherme Giorgi</strong><br>
            <em>Engenheiro Agrônomo, Especialista em Agricultura Digital e IA</em>
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280;">
            Este e-mail foi enviado porque você se cadastrou para receber nosso material gratuito sobre IA no Agronegócio.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: "Ebook-IA-no-Agronegocio.pdf",
          path: "./public/ebook/Ebook-IA-no-Agronegocio.pdf",
        },
      ],
    })

    if (error) {
      console.error("[EBOOK] Erro ao enviar email:", error)
      return NextResponse.json({ error: "Erro ao enviar e-book" }, { status: 500 })
    }

    console.log("[EBOOK] Email enviado com sucesso:", data?.id)

    return NextResponse.json({
      success: true,
      message: "E-book enviado com sucesso!",
    })
  } catch (error) {
    console.error("[EBOOK] Erro na API:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

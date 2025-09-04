import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { nome, email, whatsapp } = await request.json()

    // Validação básica
    if (!nome || !email || !whatsapp) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Log dos dados para acompanhamento (já que não temos banco de dados)
    console.log("[v0] Novo interessado no ebook:", {
      nome,
      email,
      whatsapp,
      timestamp: new Date().toISOString(),
    })

    // Envio do email com o ebook
    const { data, error } = await resend.emails.send({
      from: "Guilherme Giorgi <guilherme@ggailabs.com>", // Substitua pelo seu domínio verificado
      to: [email],
      subject: "🚀 Seu E-book: IA no Agronegócio está aqui!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #16a34a; text-align: center;">Obrigado pelo seu interesse!</h1>
          
          <p>Olá <strong>${nome}</strong>,</p>
          
          <p>É um prazer ter você interessado em conhecer mais sobre a aplicação da Inteligência Artificial no Agronegócio!</p>
          
          <p>Seu e-book está anexado neste email. Nele você encontrará:</p>
          
          <ul>
            <li>✅ Principais IAs e suas aplicações na agricultura</li>
            <li>✅ Tecnologias emergentes e tendências</li>
            <li>✅ Guia prático para implementação</li>
          </ul>
          
          <p>Caso tenha alguma dúvida ou queira trocar uma ideia sobre o assunto, fique à vontade para entrar em contato!</p>
          
          <p>WhatsApp: ${whatsapp}</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          
          <p style="text-align: center; color: #666; font-size: 14px;">
            <strong>Guilherme Giorgi</strong><br>
            Engenheiro Agrônomo, Especialista em Agricultura Digital e IA
          </p>
        </div>
      `,
      attachments: [
        {
          filename: "Ebook_IA_no_Agro.pdf",
          path: "./public/ebook/Ebook_IA_no_Agro.pdf", // Caminho para seu ebook
        },
      ],
    })

    if (error) {
      console.error("[v0] Erro no Resend:", error)
      return NextResponse.json({ error: "Erro ao enviar o ebook. Tente novamente." }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "E-book enviado com sucesso!",
    })
  } catch (error) {
    console.error("[v0] Erro na API:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

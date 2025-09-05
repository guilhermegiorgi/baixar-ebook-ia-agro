import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"
import { saveInterestedUser } from "@/lib/supabase"
import { getUTMParams } from "@/lib/utm-tracking"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, whatsapp } = await request.json()

    // Validação básica
    if (!name || !email || !whatsapp) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Log dos dados para acompanhamento
    console.log("[v0] Novo interessado no ebook:", {
      name,
      email,
      whatsapp,
      timestamp: new Date().toISOString(),
    })

    // Obter parâmetros UTM
    const utmParams = getUTMParams()

    // Salvar no Supabase
    const supabaseResult = await saveInterestedUser({
      name,
      email,
      whatsapp,
      ...utmParams
    })

    if (!supabaseResult.success) {
      console.error("[v0] Erro ao salvar no Supabase:", supabaseResult.error)
      // Não retornamos erro aqui, pois o email ainda deve ser enviado
    } else {
      console.log("[v0] Interessado salvo no Supabase com sucesso!")
    }

    // Envio do email com o ebook
    const { data, error } = await resend.emails.send({
      from: "Guilherme Giorgi <ebook@mailing.ggailabs.com>", // Usando email com domínio verificado no Resend
      to: [email],
      subject: "🚀 Seu E-book: IA no Agronegócio está aqui!",
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Seu E-book de IA no Agronegócio</title>
            <style>
                /* Reset básico para emails */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    line-height: 1.6;
                    color: #333333;
                    background-color: #f8fafc;
                }
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                .header {
                    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                    padding: 40px 30px;
                    text-align: center;
                    color: white;
                }
                
                .header h1 {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                
                .header p {
                    font-size: 16px;
                    opacity: 0.95;
                    font-weight: 300;
                }
                
                .content {
                    padding: 40px 30px;
                }
                
                .greeting {
                    font-size: 18px;
                    color: #1f2937;
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                
                .intro-text {
                    font-size: 16px;
                    color: #4b5563;
                    margin-bottom: 30px;
                    line-height: 1.7;
                }
                
                .ebook-preview {
                    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                    border: 2px solid #22c55e;
                    border-radius: 12px;
                    padding: 25px;
                    margin: 30px 0;
                    text-align: center;
                }
                
                .ebook-image-container {
                    margin-bottom: 20px;
                }
                
                .ebook-image {
                    max-width: 200px;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    transition: transform 0.3s ease;
                }
                
                .ebook-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 10px;
                }
                
                .ebook-subtitle {
                    font-size: 14px;
                    color: #6b7280;
                    margin-bottom: 20px;
                }
                
                .features-list {
                    text-align: left;
                    max-width: 400px;
                    margin: 0 auto;
                }
                
                .feature-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 12px;
                    font-size: 15px;
                    color: #374151;
                }
                
                .feature-icon {
                    width: 20px;
                    height: 20px;
                    background: #22c55e;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 12px;
                    flex-shrink: 0;
                }
                
                .contact-section {
                    background-color: #f9fafb;
                    border-radius: 8px;
                    padding: 25px;
                    margin-top: 30px;
                    text-align: center;
                }
                
                .contact-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #1f2937;
                    margin-bottom: 15px;
                }
                
                .contact-text {
                    font-size: 15px;
                    color: #6b7280;
                    margin-bottom: 20px;
                }
                
                .whatsapp-button {
                    display: inline-block;
                    background: #25d366;
                    color: white;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-weight: 600;
                    font-size: 15px;
                    transition: all 0.3s ease;
                }
                
                .whatsapp-button:hover {
                    background: #20ba5a;
                    transform: translateY(-1px);
                }
                
                .footer {
                    background-color: #1f2937;
                    color: #9ca3af;
                    text-align: center;
                    padding: 25px 30px;
                    font-size: 14px;
                }
                
                .footer p {
                    margin-bottom: 5px;
                }
                
                /* Responsividade para dispositivos móveis */
                @media only screen and (max-width: 600px) {
                    .email-container {
                        margin: 0;
                        box-shadow: none;
                    }
                    
                    .header, .content, .footer {
                        padding: 30px 20px;
                    }
                    
                    .header h1 {
                        font-size: 24px;
                    }
                    
                    .ebook-preview {
                        padding: 20px;
                        margin: 20px 0;
                    }
                    
                    .features-list {
                        max-width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <!-- Header -->
                <div class="header">
                    <h1>🚀 Obrigado pelo seu interesse!</h1>
                    <p>Seu e-book sobre IA no Agronegócio está aqui</p>
                </div>
                
                <!-- Conteúdo Principal -->
                <div class="content">
                    <div class="greeting">
                        Olá ${name}! 👋
                    </div>
                    
                    <div class="intro-text">
                        É um prazer ter você interessado em conhecer mais sobre a aplicação da <strong>Inteligência Artificial no Agronegócio</strong>! Este é um campo em constante evolução que está revolucionando a agricultura moderna.
                    </div>
                    <!-- Assinatura -->
                    <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                        <p style="font-style: italic; color: #6b7280; margin-bottom: 10px;">Abraços,</p>
                        <p style="font-weight: 600; color: #1f2937; font-size: 16px;">Guilherme Giorgi</p>
                        <p style="font-size: 14px; color: #6b7280; margin-top: 5px;">Engenheiro Agrônomo, Especialista em Agricultura Digital e IA</p>
                    </div>                   
                    <!-- Preview do E-book -->
                    <div class="ebook-preview">
                        <div class="ebook-image-container">
                            <img src="https://mailing.ggailabs.com/ebook/ebook.png" alt="E-book IA no Agronegócio" class="ebook-image" />
                        </div>
                        <div class="ebook-title">IA no Agronegócio</div>
                        <div class="ebook-subtitle">Guia Completo e Prático</div>
                        
                        <div class="features-list">
                            <div class="feature-item">
                                <div class="feature-icon">✓</div>
                                <span>Principais IAs e suas aplicações na agricultura</span>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon">✓</div>
                                <span>Tecnologias emergentes e tendências do setor</span>
                            </div>
                            <div class="feature-item">
                                <div class="feature-icon">✓</div>
                                <span>Guia prático para implementação eficiente</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Seção de Contato -->
                    <div class="contact-section">
                        <div class="contact-title">💬 Vamos conversar?</div>
                        <div class="contact-text">
                            Caso tenha alguma dúvida ou queira trocar uma ideia sobre o assunto, fique à vontade para entrar em contato!
                        </div>
                        <a href="https://wa.me/5565999227033" class="whatsapp-button">
                            📱 WhatsApp: (65) 99922-7033
                        </a>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="footer">
                    <p><strong>Inteligência Artificial no Agronegócio</strong></p>
                    <p>Transformando o futuro da agricultura com tecnologia</p>
                </div>
            </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: "Ebook-IA-no-Agro.pdf",
          path: "http://mailing.ggailabs.com/ebook/Ebook-IA-no-Agro.pdf",
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

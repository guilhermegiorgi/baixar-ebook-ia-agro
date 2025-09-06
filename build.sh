#!/bin/bash

# Script de build para Docker
# Uso: ./build.sh [tag]

# Definir variáveis
IMAGE_NAME="guilhermegiorgi/baixar-ebook-ia-agro"
IMAGE_TAG=${1:-latest}
FULL_IMAGE_NAME="${IMAGE_NAME}:${IMAGE_TAG}"

echo "🚀 Iniciando build da imagem Docker: ${FULL_IMAGE_NAME}"

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Por favor, instale o Docker."
    exit 1
fi

# Criar arquivo .env para Docker (se não existir)
if [ ! -f .env.docker ]; then
    echo "📝 Criando arquivo .env.docker..."
    cat > .env.docker << EOF
RESEND_API_KEY=${RESEND_API_KEY}
BASEHUB_TOKEN=${BASEHUB_TOKEN}
NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EOF
fi

# Build da imagem
echo "🔨 Construindo a imagem Docker..."
docker build -t ${FULL_IMAGE_NAME} .

if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📦 Imagem criada: ${FULL_IMAGE_NAME}"
    
    # Testar a imagem
    echo "🧪 Testando a imagem..."
    docker run --rm -p 3000:3000 \
        -e NODE_ENV=production \
        -e NEXT_PUBLIC_BASE_URL=http://localhost:3000 \
        -e RESEND_API_KEY=${RESEND_API_KEY} \
        -e BASEHUB_TOKEN=${BASEHUB_TOKEN} \
        -e NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL} \
        -e NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY} \
        ${FULL_IMAGE_NAME} &
    
    # Esperar o serviço iniciar
    sleep 10
    
    # Testar se a aplicação está respondendo
    if curl -f http://localhost:3000/ > /dev/null 2>&1; then
        echo "✅ Aplicação está rodando em http://localhost:3000"
        echo "🛑 Pressione Ctrl+C para parar o container"
        wait
    else
        echo "❌ Aplicação não respondeu. Verifique os logs."
        docker logs $(docker ps -l -q)
    fi
else
    echo "❌ Build falhou!"
    exit 1
fi

echo "🎉 Processo concluído!"

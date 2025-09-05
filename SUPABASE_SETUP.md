# Configuração do Supabase com UTM Tracking

## 1. Criar uma conta no Supabase
1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto

## 2. Configurar as variáveis de ambiente
No seu arquivo `.env.local`, adicione:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=seu_projeto_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

## 3. Criar a tabela no Supabase
No painel do Supabase, vá para:
1. **Table Editor** → **New table**
2. Nome da tabela: `interested_users`
3. Campos:
   - `id` (UUID, Primary Key, Increment)
   - `name` (text, not null)
   - `email` (text, not null)
   - `whatsapp` (text, not null)
   - `utm_source` (text, nullable)
   - `utm_medium` (text, nullable)
   - `utm_campaign` (text, nullable)
   - `utm_term` (text, nullable)
   - `utm_content` (text, nullable)
   - `created_at` (timestamp, default: `now()`)

## 4. Configurar RLS (Row Level Security)
1. Vá para **Authentication** → **Policies**
2. Crie uma nova política para a tabela `interested_users`:
   ```sql
   -- Política para permitir inserções
   CREATE POLICY "Allow insert interested users" ON interested_users
   FOR INSERT WITH CHECK (true);
   ```

## 5. Obter as credenciais
1. No painel do Supabase, vá para **Settings** → **API**
2. Copie:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## 6. Testar a integração
1. Preencha o formulário no site
2. Verifique os logs no console do navegador
3. Verifique se os dados aparecem no painel do Supabase

## Estrutura da tabela final:
```sql
CREATE TABLE interested_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## UTM Tracking - Como Funciona

### Parâmetros UTM Suportados:
- `utm_source`: Fonte do tráfego (ex: google, facebook, newsletter)
- `utm_medium`: Meio de marketing (ex: cpc, social, email)
- `utm_campaign`: Nome da campanha (ex: verao2024, ebook_agro)
- `utm_term`: Termo de pesquisa (ex: "inteligencia artificial agronegocio")
- `utm_content`: Conteúdo específico (ex: banner_topo, sidebar)

### Como Testar:
1. Acesse o site com parâmetros UTM:
   ```
   http://localhost:3000?utm_source=google&utm_medium=cpc&utm_campaign=teste
   ```
2. Preencha o formulário
3. Verifique no painel do Supabase se os campos UTM foram salvos

### Exemplos de URLs:
- **Google Ads**: `?utm_source=google&utm_medium=cpc&utm_campaign=ebook_agro`
- **Facebook**: `?utm_source=facebook&utm_medium=social&utm_campaign=ebook_agro`
- **Newsletter**: `?utm_source=newsletter&utm_medium=email&utm_campaign=edicao_001`

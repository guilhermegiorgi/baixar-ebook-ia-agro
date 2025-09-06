import { setGlobalConfig } from "basehub";

const _vercel_url_env = "VERCEL_URL";
const _basehub_url_env = "BASEHUB_URL";

// Priorizar BASEHUB_URL se existir, senão usar VERCEL_URL
let v0Id = process.env[_basehub_url_env] || process.env[_vercel_url_env];

if (v0Id && v0Id.includes("vusercontent")) {
  v0Id = v0Id.split(".")[0];
}

// Se não encontrar URL, usar um ID de fallback para desenvolvimento
const playgroundId = v0Id ? `${encodeURIComponent(v0Id)}__rel_v0` : undefined;

setGlobalConfig({
  // Desativar fallback playground em produção para evitar erros
  fallbackPlayground: process.env.NODE_ENV === 'development' && playgroundId
    ? { target: "basehub/waitlist-template", id: playgroundId }
    : undefined,
});

import { Platform } from 'react-native';

// Variáveis EXPO_PUBLIC_* são lidas do .env na hora do build
// (equivalente ao VITE_* ou REACT_APP_* do React web).
export const API_URL = (process.env.EXPO_PUBLIC_API_URL || '').replace(/\/$/, '');

// Função única para conversar com o backend: monta a URL, envia JSON,
// acrescenta o token quando existir e transforma erro HTTP em exceção.
export async function apiFetch(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Erro HTTP ${response.status}`);
  }
  return data;
}

// Diz em qual plataforma o app está rodando. No desktop (Electron)
// o React Native enxerga "web", então conferimos o userAgent.
export function plataformaAtual() {
  if (Platform.OS === 'web') {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    return ua.includes('Electron') ? 'desktop (Electron)' : 'web (navegador)';
  }
  return Platform.OS; // 'ios' ou 'android'
}

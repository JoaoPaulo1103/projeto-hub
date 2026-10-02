import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage substitui o localStorage do React web.
// Funciona no Android, no iOS e também na web (lá ele usa o próprio localStorage).
const CHAVE_TOKEN = 'hub:token';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Ao abrir o app, recupera o token salvo anteriormente.
  useEffect(() => {
    AsyncStorage.getItem(CHAVE_TOKEN)
      .then((salvo) => setToken(salvo))
      .finally(() => setCarregando(false));
  }, []);

  async function entrar(novoToken) {
    await AsyncStorage.setItem(CHAVE_TOKEN, novoToken);
    setToken(novoToken);
  }

  async function sair() {
    await AsyncStorage.removeItem(CHAVE_TOKEN);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, carregando, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

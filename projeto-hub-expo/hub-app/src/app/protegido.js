import { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Botao, Cartao, Resultado, Tela, styles } from '../components/ui';

// Tela 3 — GET /test/protected enviando "Authorization: Bearer <token>".
export default function ProtegidoScreen() {
  const { token, carregando: lendoToken } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const consultar = useCallback(async () => {
    if (!token) return;
    setCarregando(true);
    setErro('');
    try {
      const data = await apiFetch('/test/protected', { token });
      setUsuario(data.user);
    } catch (e) {
      setUsuario(null);
      setErro(e.message); // ex.: "Token inválido ou expirado."
    } finally {
      setCarregando(false);
    }
  }, [token]);

  // Executa sempre que a aba ganha foco (não só na primeira abertura).
  useFocusEffect(
    useCallback(() => {
      consultar();
    }, [consultar])
  );

  if (lendoToken) return null;

  return (
    <Tela>
      <Cartao titulo="Rota protegida">
        {!token ? (
          <Text style={styles.texto}>Faça login na aba “Login” para gerar um token.</Text>
        ) : (
          <>
            {usuario && (
              <Text style={styles.texto}>
                Olá, {usuario.username}! Token válido até{' '}
                {new Date(usuario.exp * 1000).toLocaleTimeString('pt-BR')}.
              </Text>
            )}
            <Resultado erro={erro} />
            <Botao texto="Consultar novamente" onPress={consultar} carregando={carregando} />
          </>
        )}
      </Cartao>
    </Tela>
  );
}

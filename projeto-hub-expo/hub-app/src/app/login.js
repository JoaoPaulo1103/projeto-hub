import { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { router } from 'expo-router';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Botao, Cartao, Resultado, Tela, styles } from '../components/ui';

// Tela 2 — POST /test/token. O token recebido fica salvo no AsyncStorage.
export default function LoginScreen() {
  const { token, entrar, sair } = useAuth();
  const [username, setUsername] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function gerarToken() {
    setCarregando(true);
    setErro('');
    try {
      const data = await apiFetch('/test/token', {
        method: 'POST',
        body: { username: username.trim() || 'aluno' },
      });
      await entrar(data.token);
      router.push('/protegido'); // navega para a aba "Protegido"
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Tela>
      <Cartao titulo="Gerar token JWT">
        <Text style={styles.rotulo}>Nome de usuário</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="ex.: maria"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Botao texto="Entrar" onPress={gerarToken} carregando={carregando} />
        <Resultado erro={erro} />
      </Cartao>

      {token && (
        <Cartao titulo="Sessão atual">
          <Resultado>{token.slice(0, 40)}…</Resultado>
          <Botao texto="Sair" variante="secundario" onPress={sair} />
        </Cartao>
      )}
    </Tela>
  );
}

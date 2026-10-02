import { useState } from 'react';
import { Text, TextInput } from 'react-native';
import { apiFetch } from '../services/api';
import { Botao, Cartao, Resultado, Tela, styles } from '../components/ui';

// Tela 4 — POST /test/hash: o backend devolve o hash bcrypt da senha.
export default function SenhaScreen() {
  const [senha, setSenha] = useState('');
  const [resposta, setResposta] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function gerarHash() {
    setCarregando(true);
    setErro('');
    setResposta(null);
    try {
      setResposta(await apiFetch('/test/hash', { method: 'POST', body: { password: senha } }));
    } catch (e) {
      setErro(e.message); // ex.: "Senha mínima: 8 caracteres."
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Tela>
      <Cartao titulo="Hash de senha (bcrypt)">
        <Text style={styles.rotulo}>Senha de teste</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="mínimo 8 caracteres"
          secureTextEntry
        />
        <Botao texto="Gerar hash" onPress={gerarHash} carregando={carregando} />
        <Resultado erro={erro}>
          {resposta && `hash: ${resposta.hash}\nconfere: ${resposta.validation}`}
        </Resultado>
      </Cartao>
    </Tela>
  );
}

import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { API_URL, apiFetch, plataformaAtual } from '../services/api';
import { Botao, Cartao, Resultado, Tela, styles } from '../components/ui';

// Tela 1 — consulta GET /health, a mesma rota testada com curl no passo 9.
export default function StatusScreen() {
  const [saude, setSaude] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function verificar() {
    setCarregando(true);
    setErro('');
    try {
      setSaude(await apiFetch('/health'));
    } catch (e) {
      setSaude(null);
      setErro(`Falha ao acessar a API: ${e.message}`);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    verificar();
  }, []);

  return (
    <Tela>
      <Cartao titulo="Onde este app está rodando">
        <Text style={styles.texto}>Plataforma: {plataformaAtual()}</Text>
        <Text style={styles.texto}>API: {API_URL || '(EXPO_PUBLIC_API_URL não definida)'}</Text>
      </Cartao>

      <Cartao titulo="Saúde do backend">
        {saude && (
          <Text style={styles.texto}>
            Status: {saude.status} • Node {saude.nodeVersion} • no ar há {saude.uptime}s
          </Text>
        )}
        <Resultado erro={erro} />
        <Botao texto="Verificar novamente" onPress={verificar} carregando={carregando} />
      </Cartao>
    </Tela>
  );
}

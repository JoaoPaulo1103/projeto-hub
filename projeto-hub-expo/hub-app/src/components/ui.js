import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Componentes visuais reaproveitados pelas telas.
// No React web seriam <div>, <button> e CSS; aqui são View, Pressable e StyleSheet.

export function Tela({ children }) {
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      {children}
    </ScrollView>
  );
}

export function Cartao({ titulo, children }) {
  return (
    <View style={styles.cartao}>
      {titulo ? <Text style={styles.titulo}>{titulo}</Text> : null}
      {children}
    </View>
  );
}

export function Botao({ texto, onPress, carregando, variante = 'primario' }) {
  const secundario = variante === 'secundario';
  return (
    <Pressable
      onPress={onPress}
      disabled={carregando}
      style={({ pressed }) => [
        styles.botao,
        secundario && styles.botaoSecundario,
        (pressed || carregando) && { opacity: 0.7 },
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={secundario ? '#1F4D78' : '#fff'} />
      ) : (
        <Text style={[styles.botaoTexto, secundario && styles.botaoTextoSecundario]}>{texto}</Text>
      )}
    </Pressable>
  );
}

export function Resultado({ erro, children }) {
  if (!erro && !children) return null;
  return (
    <View style={[styles.resultado, erro && styles.resultadoErro]}>
      <Text style={[styles.resultadoTexto, erro && { color: '#8A1C1C' }]}>{erro || children}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#F3F5F7' },
  conteudo: { padding: 16, gap: 16, width: '100%', maxWidth: 640, alignSelf: 'center' },
  cartao: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E1E6EC',
  },
  titulo: { fontSize: 18, fontWeight: '700', color: '#0B2545' },
  texto: { fontSize: 15, color: '#303844', lineHeight: 22 },
  rotulo: { fontSize: 13, fontWeight: '600', color: '#1F4D78' },
  input: {
    borderWidth: 1,
    borderColor: '#C9D2DC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#1F4D78',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoSecundario: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#1F4D78' },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  botaoTextoSecundario: { color: '#1F4D78' },
  resultado: { backgroundColor: '#EAF4EE', borderRadius: 8, padding: 12 },
  resultadoErro: { backgroundColor: '#FDECEC' },
  resultadoTexto: { fontFamily: 'monospace', fontSize: 13, color: '#1E4D36' },
});

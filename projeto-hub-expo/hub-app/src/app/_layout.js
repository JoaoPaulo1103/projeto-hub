import { Tabs } from 'expo-router/js-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../context/AuthContext';

// Cada arquivo dentro de src/app vira uma rota (como páginas no Next.js).
// Este _layout define a navegação por abas, comum a todas elas.
function icone(nome) {
  return ({ color, size }) => <Ionicons name={nome} color={color} size={size} />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTitleStyle: { color: '#0B2545' },
          tabBarActiveTintColor: '#1F4D78',
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Status', tabBarIcon: icone('pulse') }} />
        <Tabs.Screen name="login" options={{ title: 'Login', tabBarIcon: icone('key') }} />
        <Tabs.Screen name="protegido" options={{ title: 'Protegido', tabBarIcon: icone('lock-closed') }} />
        <Tabs.Screen name="senha" options={{ title: 'Senha', tabBarIcon: icone('finger-print') }} />
      </Tabs>
    </AuthProvider>
  );
}

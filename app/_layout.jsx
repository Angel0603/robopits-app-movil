import { Stack } from 'expo-router'
import { FontProvider } from '../components/FontContext'
import Header from '../components/Header'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <FontProvider>
        <Stack
          screenOptions={{
            header: () => (
              <Header />
            )
          }}>
          {/* CON ESTA RUTA INICIA EL SPLASH SCREEN */}
          <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="registro" options={{ headerShown: false }} />
          <Stack.Screen name="recuperarContrasena" options={{ headerShown: false }} />
        </Stack>
      </FontProvider>
    </SafeAreaProvider>
  )
}

export default RootLayout


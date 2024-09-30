import { Stack } from 'expo-router'
import { FontProvider } from '../components/FontContext'

const RootLayout = () => {
  return (
    <FontProvider>
      <Stack>
        {/* CON ESTA RUTA INICIA EL SPLASH SCREEN */}
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="registro" options={{ headerShown: false }} />
      </Stack>
    </FontProvider>
  )
}

export default RootLayout


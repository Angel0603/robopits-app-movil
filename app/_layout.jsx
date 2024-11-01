import { Stack } from 'expo-router'
import { FontProvider } from '../components/FontContext'
import Header from '../components/Header'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CartIcon } from '../components/Icons';
const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <FontProvider>
        <Stack>
          {/* CON ESTA RUTA INICIA EL SPLASH SCREEN */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="registro" options={{ headerShown: false }} />
          <Stack.Screen name="recuperarContrasena" options={{ headerShown: false }} />
          <Stack.Screen name="categorias"
            options={{
              headerShown: true,
              headerTitle: 'Categorías',
              headerBackTitle: 'Atrás',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#2587eb',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="avisos_de_privacidad"
            options={{
              headerShown: true,
              headerTitle: 'Avisos de privacidad',
              headerBackTitle: 'Atrás',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#81309b',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen name="terminos_y_condiciones"
            options={{
              headerShown: true,
              headerTitle: 'Términos y Condiciones',
              headerBackTitle: 'Atrás',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#ffc700',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />

          <Stack.Screen name="quienes_somos"
            options={{
              headerShown: true,
              headerTitle: '¿Quién Somos?',
              headerBackTitle: 'Atrás',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#27787a',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />

        </Stack>
      </FontProvider>
    </SafeAreaProvider>
  )
}

export default RootLayout


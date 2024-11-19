import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';

// Crear el contexto de las fuentes
const FontContext = createContext();

// Hook para usar el contexto de fuentes
export const useFontContext = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Mantén la pantalla de carga visible mientras se cargan las fuentes
    SplashScreen.preventAutoHideAsync();

    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
          PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
          Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error al cargar las fuentes:', error);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Muestra un indicador de carga mientras se cargan las fuentes
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={36} color="#0000ff" />
      </View>
    );
  }

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};

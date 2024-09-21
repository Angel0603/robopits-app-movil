import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const FontContext = createContext();

export const useFontContext = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
        Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
        // Añade aquí todas las fuentes que necesites cargar
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
      async function prepare() {
          await SplashScreen.preventAutoHideAsync();
      }
      prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // O una pantalla de carga mientras se cargan las fuentes
  }

  return (
    <FontContext.Provider value={{ fontsLoaded }} onLayout={onLayout}>
      {children}
    </FontContext.Provider>
  );
};

import React from 'react';
import { Text } from 'react-native';
import { useFontContext } from './FontContext'; // Importa el contexto

const Textito = ({ children, fontFamily = 'Poppins', style, ...props }) => {
  const { fontsLoaded } = useFontContext(); // Accede al estado de las fuentes cargadas

  if (!fontsLoaded) {
    return null; // O una pantalla de carga
  }

  return (
    <Text style={[{ fontFamily }, style]} {...props}>
      {children}
    </Text>
  );
};

export default Textito;

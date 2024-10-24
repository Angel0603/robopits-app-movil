import React from 'react';
import { Text } from 'react-native';
import { useFontContext } from './FontContext'; // Importa el contexto

// Actualización para usar React.forwardRef
const Textito = React.forwardRef(({ children, fontFamily = 'Poppins', style, ...props }, ref) => {
  const { fontsLoaded } = useFontContext(); // Accede al estado de las fuentes cargadas

  if (!fontsLoaded) {
    return null; // O una pantalla de carga
  }

  return (
    <Text ref={ref} style={[{ fontFamily }, style]} {...props}>
      {children}
    </Text>
  );
});

export default Textito;

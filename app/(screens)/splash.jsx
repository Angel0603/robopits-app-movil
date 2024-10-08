import { View, Image, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import Textito from '../../components/Textito';

const SplashScreen = () => {
    const router = useRouter();
    
    // Crear un valor animado para la rotación
    const rotateValue = useRef(new Animated.Value(0)).current;

    // Configurar la animación de rotación
    useEffect(() => {
        // Función que controla la rotación
        const startRotation = () => {
            rotateValue.setValue(0);
            Animated.loop(
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 5000, // Tiempo en milisegundos para completar la rotación
                    easing: Easing.linear, // Rotación lineal (constante)
                    useNativeDriver: true, // Usa el motor nativo para animaciones
                })
            ).start();
        };

        startRotation();

        // Redireccionar después de 3 segundos
        const timeout = setTimeout(() => {
            router.push('/registro');
        }, 3000);

        // Limpiar el timeout cuando el componente se desmonte
        return () => clearTimeout(timeout);
    }, [rotateValue, router]);

    // Interpolación para convertir el valor de rotación de 0 a 360 grados
    const rotation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View className="flex-1">
            <Image source={require('../../assets/fondo-splash.png')} className="w-full h-full" />
            <View className="absolute justify-center items-center w-full h-3/6">
                <Textito className="text-5xl font-black text-black-500 pt-10" fontFamily="PoppinsBold">
                    RoboPits
                </Textito>
                {/* Imagen rotando */}
                <Animated.Image
                    source={require('../../assets/logo-robopits.png')}
                    style={{ width: 240, height: 240, transform: [{ rotate: rotation }] }} // Aplicar rotación
                />
            </View>
        </View>
    );
};

export default SplashScreen;

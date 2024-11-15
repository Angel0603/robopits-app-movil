import React, { useEffect, useState } from 'react';
import { View, ScrollView, Animated, Pressable, Image, RefreshControl } from 'react-native';
import { styled } from 'nativewind';
import ApiService from '../lib/ApiService';
import Textito from '../components/Textito';
import { useRouter } from 'expo-router';
import { format } from 'date-fns';

const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);

const Ofertas = () => {
    const [ofertas, setOfertas] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    // Función para formatear la fecha
    const formatFecha = (fecha) => {
        return format(new Date(fecha), 'dd/MM/yyyy'); // Cambia el formato aquí según lo que necesites
    };

    // Función para obtener ofertas
    const fetchOfertas = async () => {
        try {
            const response = await ApiService.getInstance().fetchData('ofertas');
            setOfertas(response || []);
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    };

    // Llamada a fetchOfertas al montar el componente
    useEffect(() => {
        fetchOfertas();
    }, []);

    // Función para manejar la recarga de datos
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchOfertas();
        setRefreshing(false);
    };

    // Función para manejar la animación en el clic de la card
    const handlePressIn = (scaleValue) => {
        Animated.spring(scaleValue, {
            toValue: 0.95, // reduce el tamaño a 95%
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = (scaleValue) => {
        Animated.spring(scaleValue, {
            toValue: 1, // vuelve al tamaño original
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ScrollView
            className="flex-1 p-4 bg-white"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Textito className="text-2xl font-bold mb-4">Ofertas Especiales</Textito>

            {ofertas.length === 0 ? (
                <View className="items-center justify-center mt-10">
                    <Image
                        source={require('../assets/sin-ofertas.png')}
                        className="w-48 h-48 mb-4"
                        style={{ resizeMode: 'contain' }}
                    />
                    <Textito className="text-lg text-gray-600 mb-2 text-center">
                        No hay ofertas disponibles por el momento
                    </Textito>
                    <Pressable onPress={() => router.push('/home')} className="bg-[#3ba4f6] px-6 py-2 rounded-full mt-4 active:opacity-50">
                        <Textito className="text-white text-lg">Ir a Inicio</Textito>
                    </Pressable>
                </View>
            ) : (
                <View className="flex flex-wrap flex-row justify-center">
                    {ofertas.map((oferta) => {
                        const scaleValue = new Animated.Value(1); // Estado para el efecto de escala

                        return (
                            <Animated.View
                                key={oferta._id}
                                style={{ transform: [{ scale: scaleValue }] }}
                                className="bg-white border border-gray-200 rounded-lg shadow-md m-2 p-4 w-full max-w-sm"
                            >
                                <StyledPressable
                                    onPressIn={() => handlePressIn(scaleValue)}
                                    onPressOut={() => handlePressOut(scaleValue)}
                                    onPress={() => console.log('Navigate to:', oferta.IdOferta)} // Reemplaza esto con la navegación deseada
                                >
                                    <StyledImage
                                        source={{ uri: oferta.Imagen }}
                                        className="w-full h-48 rounded-md mb-2"
                                        style={{ resizeMode: 'contain' }}
                                    />
                                    <Textito className="text-lg text-[#223263] mb-1" fontFamily='PoppinsBold'>
                                        {oferta.Descripcion}
                                    </Textito>
                                    <Textito className="line-through text-lg text-[#000]/60" fontFamily="PoppinsBold">
                                        ${oferta.PrecioOriginal.toFixed(2)}
                                    </Textito>
                                    <Textito className="text-lg text-green-500" fontFamily="PoppinsBold">
                                        ${oferta.PrecioOferta.toFixed(2)}
                                    </Textito>
                                    <Textito className="text-sn text-green-500" fontFamily="PoppinsBold">
                                        Termina: {formatFecha(oferta.FechaFin)}
                                    </Textito>
                                </StyledPressable>
                            </Animated.View>
                        );
                    })}
                </View>
            )}
        </ScrollView>
    );
};

export default Ofertas;

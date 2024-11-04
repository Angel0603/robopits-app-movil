import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ApiService from '../lib/ApiService';
import Textito from '../components/Textito';

const DetalleProducto = () => {
    const { id } = useLocalSearchParams(); // Obtén el ID del producto de los parámetros de la URL
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Llamada a la API para obtener los detalles del producto
        const fetchProducto = async () => {
            try {
                const response = await ApiService.getInstance().fetchData(`Producto/${id}`);
                setProducto(response);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProducto();
    }, [id]);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#3ba4f6" />
            </View>
        );
    }

    if (!producto) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Textito className="text-lg text-gray-600">Producto no encontrado</Textito>
                <Pressable onPress={() => router.push('/home')} className="bg-[#3ba4f6] px-6 py-2 rounded-full mt-4">
                    <Textito className="text-white text-lg">Volver a Inicio</Textito>
                </Pressable>
            </View>
        );
    }

    return (

            <ScrollView className="flex-1 bg-white p-4">
                {/* Imagen del producto */}
                <Image
                    source={{ uri: producto.Imagen }}
                    className="w-full h-72 rounded-lg mb-4"
                    style={{ resizeMode: 'contain' }}
                />

                {/* Nombre del producto */}
                <Textito className="text-2xl font-bold text-[#223263] mb-2" fontFamily="PoppinsBold">
                    {producto.NameProducto}
                </Textito>

                {/* Precio del producto */}
                <Textito className="text-xl text-[#3ba4f6] font-bold mb-4">
                    ${producto.Precio.toFixed(2)}
                </Textito>

                {/* Descripción */}
                <Textito className="text-lg text-[#223263] mb-4" fontFamily="Poppins">
                    {producto.Descripcion}
                </Textito>

                {/* Otros detalles del producto */}
                <View className="mb-4">
                    <Textito className="text-lg text-[#223263]/80 mb-2 font-bold">
                        Categoría: {producto.Categoria}
                    </Textito>
                    <Textito className="text-lg text-[#223263]/80 mb-2 font-bold">
                        Disponible: {producto.Stock} unidades
                    </Textito>
                    <Textito className="text-lg text-[#223263]/80 mb-2 font-bold">
                        Termina: {new Date(producto.FechaFin).toLocaleDateString()}
                    </Textito>
                </View>

                {/* Botón de acción */}
                <Pressable className="bg-[#3ba4f6] py-4 rounded-lg items-center active:opacity-80">
                    <Textito className="text-white text-lg font-bold">Agregar al carrito</Textito>
                </Pressable>
            </ScrollView>
    );
};

export default DetalleProducto;

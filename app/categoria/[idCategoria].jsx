import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView, ActivityIndicator, Image, RefreshControl, Alert } from "react-native";
import ApiService from '../../lib/ApiService.js';
import Textito from '../../components/Textito.jsx';
import ProductCard from '../../components/ProductCard.jsx';

const ProductosXCategoria = () => {
    const { idCategoria } = useLocalSearchParams();
    const [refreshing, setRefreshing] = useState(false);
    const [categoriaInfo, setCategoriaInfo] = useState(null);
    const [productos, setProductos] = useState([]); // Estado para almacenar productos

    const router = useRouter();

    const fetchCategoriaInfo = async () => {
        try {
            if (idCategoria) {
                // Obtener información de la categoría
                const categoria = await ApiService.getInstance().fetchData(`Categoria/${idCategoria}`);
                if (categoria) setCategoriaInfo(categoria); // Verifica si se recibió la respuesta

                // Obtener productos de la categoría
                const productosCategoria = await ApiService.getInstance().fetchData(`Productos/categoria/${idCategoria}`);
                if (productosCategoria) setProductos(productosCategoria); // Verifica si se recibió la respuesta
            }
        } catch (error) {
            console.error("Error obteniendo información de la categoría o productos:", error);
            Alert.alert("Error", "Hubo un problema obteniendo la información."); // Alternativamente, usa showMessage
        }
    };

    useEffect(() => {
        fetchCategoriaInfo();
    }, [idCategoria]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCategoriaInfo();
        setRefreshing(false);
    };

    return (
        <View className="flex-1 bg-white">
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: '#ffffff' },
                    headerTintColor: 'black',
                    headerBackTitle: 'Atrás',
                    headerTitle: categoriaInfo?.NameCategoria || 'Cargando...',
                }}
            />

            {categoriaInfo ? (
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    className="flex-1"
                >
                    {/* Información de la categoría */}
                    <View className="p-4">
                        <Textito className="text-2xl text-[#3ba4f6]/95" fontFamily='PoppinsBold'>
                            {categoriaInfo?.NameCategoria}
                        </Textito>
                    </View>

                    {/* Lista de productos */}
                    <View className="flex flex-row flex-wrap justify-between px-4">
                        {productos.length > 0 ? (
                            productos.map((product) => (
                                <View key={product._id} className="w-[50%] mb-4">
                                    <ProductCard
                                        image={product.Imagen}
                                        name={product.NameProducto}
                                        price={product.Precio.toFixed(2)}
                                        onPress={() => {
                                            console.log(product._id); // Puedes mantener el log aquí si es necesario
                                            router.push(`producto/${product._id}`);
                                        }}
                                    />
                                </View>
                            ))
                        ) : (
                            <View className="flex-1 items-center justify-center">
                                <Image source={require('../../assets/sin-ofertas.png')} className="w-48 h-48 items-center justify-center" />
                                <Textito className="text-sm text-[#9098B1] mt-6">No hay productos en esta categoría.</Textito>
                            </View>
                        )}
                    </View>
                </ScrollView>
            ) : (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size={36} color="#3BA4F6" />
                </View>
            )}
        </View>
    );
};

export default ProductosXCategoria;

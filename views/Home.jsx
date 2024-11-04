import { View, Text, Pressable, ScrollView, Image, RefreshControl } from 'react-native';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import ApiService from '../lib/ApiService.js';
import React, { useEffect, useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import CategoriaScrollView from '../components/CategoriaScrollView.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Textito from '../components/Textito.jsx';

const StyledPressable = styled(Pressable);

const Home = () => {
    const [categorias, setCategorias] = useState([]);
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();
    
    const showProducts = async () => {
        try {
            const response = await ApiService.getInstance().fetchData('Productos');
            setProducts(response);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    const showCategorias = async () => {
        try {
            const response = await ApiService.getInstance().fetchData('Categorias');
            setCategorias(response);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    // Función para manejar la actualización de la vista
    const onRefresh = async () => {
        setRefreshing(true);
        await showCategorias();
        await showProducts();
        setRefreshing(false);
    };

    useEffect(() => {
        showCategorias();
        showProducts();
    }, []);

    return (
        <ScrollView
            className="flex-1 bg-white"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View className="flex-1 bg-white w-full items-center">
                <View className="w-full">
                    <ImageCarousel />
                </View>

                <View className="flex-row w-full px-5 justify-between">
                    <Textito className="text-lg text-[#223263]/95" fontFamily='PoppinsBold'>
                        Categorías
                    </Textito>

                    <Link href="/categorias" asChild>
                        <StyledPressable className="active:opacity-50">
                            <Textito className="text-lg text-[#3ba4f6]" fontFamily='PoppinsBold'>
                                Más categorías
                            </Textito>
                        </StyledPressable>
                    </Link>
                </View>

                <CategoriaScrollView categorias={categorias} />

                <View className="flex-row w-full px-5 justify-between mt-5">
                    <Textito className="text-lg text-[#223263]/95" fontFamily='PoppinsBold'>
                        Más vendidos
                    </Textito>

                    <StyledPressable className="active:opacity-50">
                        <Textito className="text-lg font-bold text-[#3ba4f6]" fontFamily='PoppinsBold'>
                            Ver más
                        </Textito>
                    </StyledPressable>
                </View>

                {/* Cards Productos */}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View className="w-full flex-row">
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                image={product.Imagen}
                                name={product.NameProducto}
                                price={product.Precio.toFixed(2)}
                                onPress={() => router.push(`/${product._id}`, console.log(product._id))}
                            />
                        ))}
                    </View>
                </ScrollView>

                <View className="flex-row w-full px-5 justify-between mt-5">
                    <Text className="text-lg font-bold text-[#223263]/95" fontFamily="Poppins">
                        Agregados recientemente
                    </Text>

                    <StyledPressable className="active:opacity-50">
                        <Text className="text-lg font-bold text-[#3ba4f6]" fontFamily="Poppins">
                            Ver más
                        </Text>
                    </StyledPressable>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="mb-5">
                    <View className="w-full flex-row">
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                image={product.Imagen}
                                name={product.NameProducto}
                                price={product.Precio.toFixed(2)}
                                onPress={() => router.push(`/${product._id}`, console.log(product._id))}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
};

export default Home;

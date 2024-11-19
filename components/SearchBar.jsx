import React, { useState, useEffect } from 'react';
import { View, TextInput, Modal, ScrollView, Pressable, ActivityIndicator, KeyboardAvoidingView, Image } from 'react-native';
import { SearchIcon } from './Icons';
import ApiService from '../lib/ApiService.js';
import { styled } from 'nativewind';
import ProductCard from './ProductCard.jsx';
import { useRouter } from 'expo-router';
import Textito from './Textito.jsx';

const StyledPressable = styled(Pressable);

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();
    // Obtiene los productos desde el backend
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getInstance().fetchData('Productos'); // Asegúrate de que este endpoint sea correcto
            setProducts(response || []);
            setFilteredProducts(response || []);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filtra productos mientras se escribe
    useEffect(() => {
        const filterProducts = () => {
            if (!searchQuery.trim()) {
                // Si no hay búsqueda, muestra todos los productos
                return products;
            }
            const lowercasedQuery = searchQuery.toLowerCase();
            return products.reduce((acc, product) => {
                if (product.NameProducto?.toLowerCase().includes(lowercasedQuery)) {
                    acc.push(product);
                }
                return acc;
            }, []);
        };

        setFilteredProducts(filterProducts());
    }, [searchQuery, products]);


    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <View>
            {/* Barra de búsqueda */}
            <View className="w-10/12 h-2/5 flex-row items-center p-4 border border-[#EBF0FF] rounded-md bg-white">
                <SearchIcon className="w-6 h-6" />
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFocus={() => setModalVisible(true)} // Abre el modal al enfocar
                    placeholder="Buscar un producto en RoboPits"
                    style={{
                        width: '100%',
                        height: 50,
                        marginLeft: 8,
                        fontFamily: 'Poppins',
                        fontSize: 14,
                        color: '#223263',
                    }}
                    placeholderTextColor="#9098B1"
                />
            </View>

            {/* Modal para mostrar los resultados */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <KeyboardAvoidingView behavior="padding" className="flex-1">
                    <View className="flex-1 bg-white justify-start pt-12 pb-5">
                        {/* Mantén la barra de búsqueda fija */}
                        <View className="w-11/12 mx-auto mt-3">
                            <View className="w-full flex-row items-center p-4 border border-[#EBF0FF] rounded-md bg-white">
                                <SearchIcon className="w-6 h-6" />
                                <TextInput
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    placeholder="Buscar un producto en RoboPits"
                                    style={{
                                        flex: 1,
                                        height: 30,
                                        marginLeft: 8,
                                        fontFamily: 'Poppins',
                                        fontSize: 14,
                                        color: '#223263',
                                    }}
                                    placeholderTextColor="#9098B1"
                                />
                            </View>
                        </View>

                        <View className="bg-white p-4 rounded-lg w-full h-3/4 mx-auto flex-1">
                            <Textito className="text-lg font-bold text-[#223263] text-center">Resultados de búsqueda</Textito>

                            {loading ? (
                                <ActivityIndicator size={36} color="#3BA4F6" />
                            ) : (
                                <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((item) => (
                                            <StyledPressable
                                                key={item._id}
                                                style={{
                                                    width: '50%', // Ocupa el 48% para dar margen entre tarjetas
                                                }}
                                            >
                                                <ProductCard
                                                    image={item.Imagen}
                                                    name={item.NameProducto}
                                                    price={item.Precio.toFixed(2)}
                                                    onPress={() => {
                                                        setModalVisible(false); // Cierra el modal al seleccionar
                                                        router.push(`producto/${item._id}`);
                                                    }}
                                                />
                                            </StyledPressable>
                                        ))
                                    ) : (
                                        <View className="flex-1 justify-center items-center">
                                            <Image
                                                source={require('../assets/sin-ofertas.png')}
                                                className="w-48 h-48 mx-auto"
                                                style={{ resizeMode: 'contain' }}
                                            />
                                            <Textito className="text-lg text-gray-600 text-center mt-5">No se encontraron resultados</Textito>
                                        </View>
                                    )}
                                </ScrollView>

                            )}

                            <StyledPressable
                                onPress={() => setModalVisible(false)} // Cierra el modal
                                className="bg-[#3BA4F6] p-4 mt-4 rounded-md active:opacity-50"
                            >
                                <Textito className="text-white text-center text-base" fontFamily="PoppinsBold">Cerrar</Textito>
                            </StyledPressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

export default SearchBar;

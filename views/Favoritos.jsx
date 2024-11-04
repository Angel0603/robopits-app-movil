import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, RefreshControl, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../lib/ApiService';
import Textito from '../components/Textito';
import { useRouter } from 'expo-router';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Función para obtener los productos favoritos del usuario
  const fetchFavoritos = async () => {
    try {
      const userId = await AsyncStorage.getItem('id'); // Obtener el ID del usuario
      if (userId) {
        const favoritosData = await ApiService.getInstance().fetchData(`favoritos/${userId}`);
        setFavoritos(favoritosData.productos || []); // Asegurarse de que productos sea un array, aunque esté vacío
      }
    } catch (error) {
      console.error("Error fetching favoritos:", error);
    }
  };

  // Función para manejar la actualización al hacer "pull-to-refresh"
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFavoritos(); // Llama a la función para obtener los favoritos
    setRefreshing(false);
  };

  // Llamada a fetchFavoritos al montar el componente
  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <ScrollView
      className="flex-1 p-4 bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Textito className="text-2xl font-bold mb-4">Mis Favoritos</Textito>

      {favoritos.length === 0 ? (
        <View className="items-center justify-center mt-10">
          <Image 
            source={require('../assets/favoritos.png')} // Asegúrate de tener una imagen en esta ruta
            className="w-48 h-48 mb-4"
            style={{ resizeMode: 'contain' }}
          />
          <Textito className="text-lg text-gray-600 mb-2 text-center">
            Aún no tienes favoritos
          </Textito>
          <Pressable onPress={() => router.push('/home')} className="bg-[#3ba4f6] px-6 py-2 rounded-full mt-4 active:opacity-50">
            <Textito className="text-white text-lg">Ir a Inicio</Textito>
          </Pressable>
        </View>
      ) : (
        favoritos.map((producto, index) => (
          <View key={index} className="bg-white p-4 rounded-lg shadow mb-4">
            <Textito className="text-lg font-bold mb-2">{producto.name}</Textito>
            <View className="flex-row items-center">
              <Image source={{ uri: producto.image }} className="w-48 h-48" style={{ resizeMode: 'contain' }} />
              <View className="flex-shrink ml-4">
                <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Precio:</Textito> ${producto.price}</Textito>
                <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Descripción:</Textito> {producto.description}</Textito>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Favoritos;

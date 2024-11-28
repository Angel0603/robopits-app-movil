import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, RefreshControl, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../lib/ApiService';
import Textito from '../components/Textito';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styled } from 'nativewind';
import { showMessage } from "react-native-flash-message";

const StyledPressable = styled(Pressable);

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
      showMessage({
        message: "Error",
        description: "No se pudo cargar la lista de favoritos.",
        type: "danger",
      });
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

  const toggleFavorite = async (productId) => {
    const userId = await AsyncStorage.getItem('id');
    try {
      if (favoritos.some((producto) => producto._id === productId)) {
        // Si ya está en favoritos, eliminarlo
        await ApiService.getInstance().fetchData('favoritos/eliminar', {
          method: 'POST',
          body: JSON.stringify({ userId, productoId: productId }),
        });
        setFavoritos((prev) => prev.filter((producto) => producto._id !== productId));
        showMessage({
          message: "Eliminado de Favoritos",
          description: "El producto fue eliminado de tus favoritos.",
          type: "warning",
        });
      } else {
        // Si no está en favoritos, agregarlo
        await ApiService.getInstance().fetchData('favoritos/agregar', {
          method: 'POST',
          body: JSON.stringify({ userId, productoId: productId }),
        });
        fetchFavoritos(); // Actualiza la lista de favoritos
        showMessage({
          message: "Agregado a Favoritos",
          description: "El producto fue agregado a tus favoritos.",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error al cambiar estado de favoritos:", error);
      showMessage({
        message: "Error",
        description: "No se pudo cambiar el estado de favoritos.",
        type: "danger",
      });
    }
  };

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
          <StyledPressable key={index} onPress={() => router.push(`producto/${producto._id}`)}>
            <View className="bg-white p-4 rounded-lg shadow mb-4">
              {/* Contenedor de imagen con ícono de favoritos */}
              <View className="relative">
                <Image
                  source={{ uri: producto.Imagen }}
                  className="w-full h-48 rounded-lg"
                  style={{ resizeMode: 'contain' }}
                />
                <StyledPressable
                  onPress={() => toggleFavorite(producto._id)}
                  className="absolute top-2 right-2 p-2 rounded-full active:scale-125"
                  style={{
                    backgroundColor: favoritos.some((fav) => fav._id === producto._id) ? "#3BA4F6" : "rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <MaterialCommunityIcons
                    name={favoritos.some((fav) => fav._id === producto._id) ? "heart" : "heart-outline"}
                    size={24}
                    color={favoritos.some((fav) => fav._id === producto._id) ? "#BFE6FE" : "#3BA4F6"}
                  />
                </StyledPressable>
              </View>

              <Textito className="text-lg font-bold mb-2">{producto.NameProducto}</Textito>
              <View className="flex-row items-center">
                <View className="flex-shrink ml-4">
                  <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Precio:</Textito> ${producto.Precio}</Textito>
                  <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Categoría:</Textito> {producto.Categoria}</Textito>
                </View>
              </View>
            </View>
          </StyledPressable>
        ))
      )}
    </ScrollView>
  );
};

export default Favoritos;

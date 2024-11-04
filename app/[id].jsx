import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from "expo-router";
import { View, ScrollView, ActivityIndicator, Image, Pressable } from "react-native";
import ApiService from '../lib/ApiService';
import Textito from '../components/Textito.jsx';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styled } from 'nativewind';
import { HeartIcon } from '../components/Icons.jsx';

const StyledPressable = styled(Pressable);

const DetalleProducto = () => {
  const { id } = useLocalSearchParams();
  const [productoInfo, setProductoInfo] = useState(null);

  // Estados para controlar la visibilidad de cada sección
  const [showCaracteristicas, setShowCaracteristicas] = useState(false);
  const [showCategoria, setShowCategoria] = useState(false);
  const [showIncluye, setShowIncluye] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  const handlePress = () => {
    setIsFilled(!isFilled); // Alterna el estado entre lleno y contorno
  };

  useEffect(() => {
    if (id) {
      ApiService.getInstance().fetchData(`Producto/${id}`).then(setProductoInfo);
    }
  }, [id]);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: 'black',
          headerBackTitle: 'Atrás',
          headerTitle: productoInfo?.NameProducto || 'Cargando...',
        }}
      />

      {productoInfo === null ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3ba4f6" />
        </View>
      ) : (
        <ScrollView className="p-4">
          {/* Imagen del producto */}
          <View className="items-center mb-4">
            <Image
              source={{ uri: productoInfo.Imagen }}
              className="w-full h-72 rounded-lg"
              style={{ resizeMode: 'contain' }}
            />
          </View>

          {/* Nombre y precio del producto */}
          <View className="mb-4 flex-row justify-between items-center">
            <Textito className="text-2xl font-bold text-[#223263] mb-2">
              {productoInfo.NameProducto}
            </Textito>

            <StyledPressable
              onPress={handlePress}
              className="active:scale-95 p-2 rounded-full"
              style={{
                backgroundColor: isFilled ? "#3BA4F6" : "transparent", // Cambia el fondo al presionar
              }}
            >
              <HeartIcon
                color={isFilled ? "#BFE6FE" : "#3BA4F6"} // Cambia color entre rojo y gris
                filled={isFilled} // Lleno o contorno basado en el estado
              />
            </StyledPressable>

          </View>

          {/* Precio */}
          <View className="mb-4">
            <Textito className="text-2xl text-[#3ba4f6] font-bold mb-2">
              ${productoInfo.Precio.toFixed(2)}
            </Textito>
          </View>

          {/* Descripción */}
          <View className="mb-4">
            <Textito className="text-lg font-bold text-[#223263] mb-1">Descripción</Textito>
            <Textito className="text-base text-[#223263]/70">
              {productoInfo.Descripcion}
            </Textito>
          </View>

          {/* Características del producto */}
          <Pressable
            onPress={() => setShowCaracteristicas(!showCaracteristicas)}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-2 flex-row justify-between items-center"
          >
            <Textito className="text-lg font-bold text-[#223263]">Características</Textito>
            <MaterialCommunityIcons name={showCaracteristicas ? "minus-circle-outline" : "plus-circle-outline"} size={20} color="#3BA4F6" />
          </Pressable>
          {showCaracteristicas && (
            <View className="bg-[#f2fbfa] px-4 py-2 mb-4 border border-t-0 border-gray-200 rounded-b-lg">
              <Textito className="text-base text-[#223263]/70">
                - {productoInfo.Caracteristicas || "Información no disponible"}
              </Textito>
            </View>
          )}

          {/* Sección de categoría */}
          <Pressable
            onPress={() => setShowCategoria(!showCategoria)}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-2 flex-row justify-between items-center"
          >
            <Textito className="text-lg font-bold text-[#223263]">Categoría</Textito>
            <MaterialCommunityIcons name={showCategoria ? "minus-circle-outline" : "plus-circle-outline"} size={20} color="#3BA4F6" />
          </Pressable>
          {showCategoria && (
            <View className="bg-[#f2fbfa] px-4 py-2 mb-4 border border-t-0 border-gray-200 rounded-b-lg">
              <Textito className="text-base text-[#223263]/70">
                {productoInfo.Categoria || "Sin categoría"}
              </Textito>
            </View>
          )}

          {/* ¿Qué incluye? */}
          <Pressable
            onPress={() => setShowIncluye(!showIncluye)}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-2 flex-row justify-between items-center"
          >
            <Textito className="text-lg font-bold text-[#223263]">¿Qué incluye?</Textito>
            <MaterialCommunityIcons name={showIncluye ? "minus-circle-outline" : "plus-circle-outline"} size={20} color="#3BA4F6" />
          </Pressable>
          {showIncluye && (
            <View className="bg-[#f2fbfa] px-4 py-2 mb-4 border border-t-0 border-gray-200 rounded-b-lg">
              <Textito className="text-base text-[#223263]/70">
                {productoInfo.Incluye || "Detalles no especificados"}
              </Textito>
            </View>
          )}

          {/* Productos relacionados */}
          <View className="mb-4">
            <Textito className="text-lg font-bold text-[#223263] mb-2">También puede interesarte</Textito>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {productoInfo.Relacionados && productoInfo.Relacionados.map((relacionado, index) => (
                <View key={index} className="w-40 bg-white border border-gray-200 rounded-lg shadow-md m-2 p-2">
                  <Image
                    source={{ uri: relacionado.Imagen }}
                    className="w-full h-24 rounded-md mb-2"
                    style={{ resizeMode: 'contain' }}
                  />
                  <Textito className="text-sm font-bold text-[#223263]">
                    {relacionado.NameProducto}
                  </Textito>
                  <Textito className="text-lg text-[#3ba4f6] font-semibold">
                    ${relacionado.Precio.toFixed(2)}
                  </Textito>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Botón de agregar al carrito */}
          <Pressable className="bg-[#3ba4f6] py-4 rounded-lg items-center mt-4 mb-10 active:opacity-50 active:scale-95">
            <Textito className="text-white text-lg font-bold">Agregar al carrito</Textito>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
};

export default DetalleProducto;

import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, RefreshControl, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../lib/ApiService';
import Textito from '../components/Textito';
import { useRouter } from 'expo-router';
import { showMessage } from "react-native-flash-message";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Función para obtener pedidos del cliente
  const fetchPedidos = async () => {
    const userId = await AsyncStorage.getItem('id'); // Obtener el ID del cliente
    if (userId) {
      const pedidosData = await ApiService.getInstance().fetchData(`pedidosCliente/${userId}`);
      
      if (pedidosData.error) {
        // Verifica si el error es específicamente un 404
        if (pedidosData.status === 404) {
          showMessage({
            message: "No hay pedidos",
            description: "No se encontraron pedidos para este cliente.",
            type: "info",
            icon: "info",
          });
        } else {
          showMessage({
            message: "Error",
            description: "Hubo un problema al obtener los pedidos. Intente nuevamente.",
            type: "danger",
            icon: "danger",
          });
        }
        setPedidos([]); // Asegura que el estado sea un array vacío en caso de error
      } else {
        setPedidos(pedidosData.pedidos || []); // Asigna los pedidos si no hubo error
      }
    }
  };

  // Función para manejar la actualización al hacer "pull-to-refresh"
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPedidos();
    setRefreshing(false);
  };

  // Llamada a fetchPedidos al montar el componente
  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <ScrollView
      className="flex-1 p-4 bg-white"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Textito className="text-2xl font-bold mb-4">Mis Pedidos</Textito>

      {pedidos.length === 0 ? (
        <View className="items-center justify-center mt-10">
          <Image 
            source={require('../assets/sin-pedidos.png')} 
            className="w-48 h-48 mb-4"
            style={{ resizeMode: 'contain' }}
          />
          <Textito className="text-lg text-gray-600 mb-2 text-center">
            Por el momento no tiene ningún pedido
          </Textito>
          <Pressable onPress={() => router.push('/home')} className="bg-[#3ba4f6] px-6 py-2 rounded-full mt-4 active:opacity-50">
            <Textito className="text-white text-lg">Ir a Inicio</Textito>
          </Pressable>
        </View>
      ) : (
        pedidos.map((pedido, index) => (
          <View key={index} className="bg-white p-4 rounded-lg shadow mb-4">
            <Textito className="text-lg font-bold mb-2">Productos</Textito>
            {pedido.productos.map((producto, idx) => (
              <View key={idx} className="flex-row mb-2 items-center">
                <Image source={{ uri: producto.image }} className="w-48 h-48" style={{ resizeMode: 'contain' }} />
                <View className="flex-shrink ml-4">
                  <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Producto:</Textito> {producto.name}</Textito>
                  <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Cantidad:</Textito> {producto.quantity}</Textito>
                  <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Precio:</Textito> ${producto.price}</Textito>
                </View>
              </View>
            ))}
            <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Total:</Textito> ${pedido.total}</Textito>
            <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Estado:</Textito> {pedido.estado}</Textito>
            <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Dirección:</Textito> {pedido.direccion}</Textito>
            <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Punto de Retiro:</Textito> {pedido.puntoDeRetiro}</Textito>
            <Textito className="text-gray-700"><Textito fontFamily="PoppinsBold">Pago:</Textito> {pedido.pago}</Textito>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Pedidos;

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { styled } from 'nativewind';
import { showMessage } from 'react-native-flash-message';
import ApiService from '../lib/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Textito from '../components/Textito';

const StyledPressable = styled(Pressable);

const Perfil = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  // Función para obtener los datos del perfil del usuario
  const fetchPerfil = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('id'); // Obtener el ID del cliente
      const response = await ApiService.getInstance().fetchData(`perfil/${userId}`);
      setUserData(response);
      setNombre(response.nombre);
      setTelefono(response.telefono);

      showMessage({
        message: 'Perfil cargado',
        description: 'Información del perfil cargada exitosamente.',
        type: 'success',
        icon: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      showMessage({
        message: 'Error',
        description: 'No se pudo cargar el perfil.',
        type: 'danger',
        icon: 'danger',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar el perfil completo
  const actualizarPerfil = async () => {
    try {
      const userId = await AsyncStorage.getItem('id'); // Obtener el ID del cliente
      const response = await ApiService.getInstance().fetchData(`perfil/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ nombre, telefono }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.message === 'Perfil actualizado correctamente.') {
        showMessage({
          message: 'Éxito',
          description: 'Perfil actualizado correctamente.',
          type: 'success',
          icon: 'success',
          duration: 3000,
        });
        fetchPerfil(); // Recarga los datos
      } else {
        showMessage({
          message: 'Error',
          description: response.message || 'No se pudo actualizar el perfil.',
          type: 'danger',
          icon: 'danger',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      showMessage({
        message: 'Error',
        description: 'Ocurrió un problema al actualizar el perfil.',
        type: 'danger',
        icon: 'danger',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={36} color="#3BA4F6" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="bg-gray-50 flex-1">
      {/* Imagen de perfil */}
      <View className="flex items-center mt-10 active:opacity-50">
        <Image
          source={require('../assets/user-default.png')}
          className="w-32 h-32 rounded-full border-4 border-[#3ba4f6] mb-6"
        />
        <Textito className="text-2xl font-bold text-[#223263]">¡Bienvenido {userData.nombre}!</Textito>
        <Textito className="text-sm text-[#9098B1] mt-2">
          Edita tu información de perfil aquí
        </Textito>
      </View>

      {/* Formulario */}
      <View className="mt-10 px-6">
        {/* Campo Nombre */}
        <Textito className="text-gray-700 text-sm font-bold mb-2">Nombre</Textito>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingrese su nombre"
          className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-4"
        />

        {/* Campo Email */}
        <Textito className="text-gray-700 text-sm font-bold mb-2">Correo Electrónico</Textito>
        <TextInput
          value={userData.email}
          editable={false}
          className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-100 mb-4 text-gray-500"
        />

        {/* Campo Teléfono */}
        <Textito className="text-gray-700 text-sm font-bold mb-2">Teléfono</Textito>
        <TextInput
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Ingrese su número de teléfono"
          className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-white mb-6"
        />

        {/* Botón Actualizar */}
        <StyledPressable
          onPress={actualizarPerfil}
          className="w-full h-12 bg-[#3ba4f6] rounded-lg flex items-center justify-center active:opacity-50"
        >
          <Textito className="text-white font-bold text-lg">Actualizar Perfil</Textito>
        </StyledPressable>
      </View>
    </ScrollView>
  );
};

export default Perfil;

import React, { useEffect, useState } from 'react'
import { View, Pressable, Image, ScrollView, Alert } from 'react-native'
import { styled } from 'nativewind'
import { AvisosIcon, CartIcon, CategoryIcon, CerrarSesionIcon, GroupIcon, HeartIcon, HomeIcon, PedidosIcon, SearchIcon, TagIcon, TerminosIcon } from '../components/Icons';
import { Link, useRouter } from 'expo-router';
import { showMessage } from "react-native-flash-message";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Textito from '../components/Textito';
import ApiService from '../lib/ApiService';

const StyledPressable = styled(Pressable);

const Menu = () => {

  const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario
  const router = useRouter();

  // Función para cerrar la sesión
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Elimina el token de sesión
      showMessage({
        message: "Sesión cerrada",
        description: "Has cerrado la sesión exitosamente.",
        type: "success",
        icon: "success",
        duration: 3000,
      });
      router.replace("/login"); // Redirige a la pantalla de login
    } catch (error) {
      console.error("Logout Error:", error);
      showMessage({
        message: "Error",
        description: "Hubo un problema al cerrar la sesión.",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };

  // Función para obtener el nombre del usuario desde la API
  const fetchUserName = async () => {
    try {
      const userId = await AsyncStorage.getItem('id'); // Obtén el ID del usuario
      console.log("User ID:", userId);
      if (userId) {
        const userData = await ApiService.getInstance().fetchData(`perfil/${userId}`);
        setUserName(userData.nombre); // Actualiza el estado con el nombre del usuario
        showMessage({
          message: "Bienvenido",
          description: `Hola, ${userData.nombre}!`,
          type: "success",
          icon: "success",    
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showMessage({
        message: "Error",
        description: "No se pudo cargar la información del usuario.",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };

  // Llama a fetchUserName al montar el componente
  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <View className="bg-white h-full">

      <View>
        <View className="w-full bg-[#2587eb] pt-14 pb-5">
          <View className="flex-column items-center">
            <StyledPressable className='active:opacity-50'>
              <Image source={require('../assets/user-default.png')} className="w-48 h-48 active:opacity-50 rounded-full mb-5" />
            </StyledPressable>
            <Textito className="text-white text-2xl" fontFamily="PoppinsBold">{userName || "Invitado"}</Textito>

            <Link asChild href="/login">
              <StyledPressable className='active:opacity-50'>
                <Textito className="text-white mt-2" fontFamily="Poppins">Ver mi perfil</Textito>
              </StyledPressable>
            </Link>
          </View>
        </View>
      </View>

      <ScrollView className="my-2">
        <View className="bg-white">
          <Link asChild href="/home">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <HomeIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
                Inicio
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        <View className="bg-white">
          <Link asChild href="/">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <SearchIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
                Buscar
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        <View className="bg-white">
          <Link asChild href="/pedidos">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <PedidosIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
                Mis pedidos
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        <View className="bg-white">
          <Link asChild href="/carrito">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <CartIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
                Mi carrito
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        <View className="bg-white">
          <Link asChild href="/favoritos">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <HeartIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md font-semibold text-[#3d3d3d]" fontFamily='PoppinsBold'>
                Favoritos
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        <View className="bg-white">
          <Link asChild href="/ofertas">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <TagIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
                Ofertas
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        <View className="bg-white">
          <Link asChild href="/categorias">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <CategoryIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
                Categorías
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        {/* Separador */}
        <View className="w-4/5 mx-auto my-2 border-b border-[#EBF0FF]"></View>

        <View className="bg-white">
          <Link asChild href="/avisos_de_privacidad">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <AvisosIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
                Avisos de privacidad
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        <View className="bg-white">
          <Link asChild href="/terminos_y_condiciones">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <TerminosIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
                Términos y condiciones
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        <View className="bg-white">
          <Link asChild href="/quienes_somos">
            <StyledPressable className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]">
              <GroupIcon color={"#3d3d3d"} />
              <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
                ¿Quiénes somos?
              </Textito>
            </StyledPressable>
          </Link>
        </View>

        <View className="bg-white">
          <StyledPressable
            onPress={handleLogout} // Asigna la función al evento onPress
            className="flex-row items-center w-full h-12 px-5 bg-white active:bg-[#EBF0FF]"
          >
            <CerrarSesionIcon color={"#3d3d3d"} />
            <Textito className="ml-5 text-md text-[#3d3d3d]" fontFamily='PoppinsBold'>
              Cerrar sesión
            </Textito>
          </StyledPressable>
        </View>

      </ScrollView>
    </View>

  )
}

export default Menu
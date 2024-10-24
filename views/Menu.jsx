import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import { AvisosIcon, CategoryIcon, GroupIcon, HeartIcon, HomeIcon, PedidosIcon, SearchIcon, TagIcon, TerminosIcon } from '../components/Icons';
import { Link } from 'expo-router';
import Textito from '../components/Textito';

const StyledPressable = styled(Pressable);

const Menu = () => {


  return (
    <View className="bg-white h-full">

      <View>
        <View className="w-full bg-[#2587eb] pt-14 pb-5">
          <View className="flex-column items-center">
            <StyledPressable className='active:opacity-50'>
              <Image source={require('../assets/logo-robopits.png')} className="w-48 h-48 active:opacity-50" />
            </StyledPressable>
            <Textito className="text-white text-xl" fontFamily="PoppinsBold">Ángel de Jesús Lara</Textito>

            <Link asChild href="/login">
              <StyledPressable className='active:opacity-50'>
                <Textito className="text-white mt-2">Ver mi perfil</Textito>
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
                ¿Quién somos?
              </Textito>
            </StyledPressable>
          </Link>
        </View>

      </ScrollView>
    </View>

  )
}

export default Menu
import { ScrollView, View, Pressable } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
import { ArduinoIcon, BotonIcon, CablesIcon, CajasOrganizadorasIcon, HerramientasIcon, LCDIcon, ModulosIcon, MotoresIcon, ProtoboardIcon, SensorIcon } from '../components/Icons.jsx';
import Textito from './Textito.jsx';

const StyledPressable = styled(Pressable);

const categoryIcons = {
  "Sensores": SensorIcon,
  "Cajas Organizadoras": CajasOrganizadorasIcon,
  "Protoboard": ProtoboardIcon,
  "Arduino y MCU": ArduinoIcon,
  "Modulos": ModulosIcon,
  "LCD": LCDIcon,
  "Motores": MotoresIcon,
  "Cables": CablesIcon,
  "Botones": BotonIcon,
  "Herramientas": HerramientasIcon,
};

const CategoriaScrollView = ({ categorias }) => {
  const firstTenCategories = categorias.length > 10 ? categorias.slice(0, 10) : categorias;

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="w-full">
      <View className="flex-row">
        {firstTenCategories.map((categoria) => {
          // Determinar el icono basado en el nombre de la categoría
          const Icon = categoryIcons[categoria.NameCategoria] || ProtoboardIcon; // Default Icon if none matched
          
          return (
            <Link key={categoria._id} href={`categoria/${categoria._id}`} asChild>
              <StyledPressable className="flex-column items-center">
                <View className="w-24 h-24 rounded-full mx-5 mt-5 mb-2 items-center justify-center border border-[#EBF0FF]">
                  <Icon color="#3ba4f6" size={34} />
                </View>
                <Textito className="text-sm text-[#9098B1]/80" fontFamily="Poppins">
                  {categoria.NameCategoria}
                </Textito>
              </StyledPressable>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CategoriaScrollView;

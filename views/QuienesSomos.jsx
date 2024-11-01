// QuienesSomos.jsx
import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import Textito from '../components/Textito';

const QuienesSomos = () => {
  return (
    <ScrollView className="flex-1 bg-[#f2fbfa]">
      <View className="px-6 py-8">
        {/* Título Principal */}
        <Textito className="text-3xl font-extrabold text-center text-[#4db4b2] my-6">¿Quiénes Somos?</Textito>

        {/* Sección de Misión */}
        <View className="mb-8 bg-white rounded-lg shadow-md p-6">
          <Textito className="text-2xl font-bold text-[#4db4b2] mb-2">Misión</Textito>
          <Textito className="text-base text-gray-700 leading-relaxed">
            En RoboPits, nuestra misión es proporcionar componentes electrónicos de alta calidad
            que impulsen la innovación y el desarrollo tecnológico, apoyando a ingenieros y
            entusiastas en la creación de proyectos que transformen el futuro.
          </Textito>
        </View>

        {/* Sección de Visión */}
        <View className="mb-8 bg-white rounded-lg shadow-md p-6">
          <Textito className="text-2xl font-bold text-[#4db4b2] mb-2">Visión</Textito>
          <Textito className="text-base text-gray-700 leading-relaxed">
            Aspiramos a ser líderes Regionales en la distribución de componentes electrónicos,
            facilitando el acceso a tecnología avanzada y contribuyendo al avance global en la
            robótica y la automatización.
          </Textito>
        </View>

        {/* Sección de Valores */}
        <View className="mb-8 bg-white rounded-lg shadow-md p-6">
          <Textito className="text-2xl font-bold text-[#4db4b2] mb-4">Valores</Textito>
          <View className="space-y-2 ml-2">
            <Textito className="text-base text-gray-700">
              <Textito className="text-base text-gray-700" fontFamily="PoppinsBold">• Innovación: </Textito>
              Fomentamos un ambiente creativo y promovemos soluciones innovadoras.
            </Textito>
            <Textito className="text-base text-gray-700">
              <Textito className="text-base text-gray-700" fontFamily="PoppinsBold">• Calidad: </Textito>
              Nos comprometemos a ofrecer productos que cumplen con los más altos estándares.
            </Textito>
            <Textito className="text-base text-gray-700">
              <Textito className="text-base text-gray-700" fontFamily="PoppinsBold">• Integridad: </Textito>
              Actuamos con honestidad y responsabilidad en todas nuestras acciones.
            </Textito>
            <Textito className="text-base text-gray-700">
              <Textito className="text-base text-gray-700" fontFamily="PoppinsBold">• Colaboración: </Textito>
              Trabajamos juntos para alcanzar metas comunes y superar desafíos.
            </Textito>
            <Textito className="text-base text-gray-700">
              <Textito className="text-base text-gray-700" fontFamily="PoppinsBold">• Satisfacción del Cliente: </Textito>
              Nos dedicamos a satisfacer y superar las expectativas de nuestros clientes.
            </Textito>
          </View>
        </View>

        {/* Sección de Equipo */}
        <View className="mb-8 bg-white rounded-lg shadow-md p-6">
          <Textito className="text-3xl font-bold text-[#4db4b2] mb-4">Nuestro Equipo</Textito>
          <Textito className="text-base text-gray-700 leading-relaxed mb-4">
            Nuestro equipo está compuesto por profesionales apasionados y expertos en tecnología
            que comparten un compromiso por la excelencia y la innovación.
          </Textito>
          <View className="flex items-center justify-center">
            <View className="bg-white shadow-lg rounded-xl p-4 mx-2 my-3 w-56 items-center">
              <Image
                className="w-24 h-24 rounded-full mb-4"
                source={require('../assets/logo-robopits.png')}
              />
              <Textito className="text-lg text-gray-700 text-center" fontFamily='PoppinsBold'>Ing. Óscar Ivá<Textito></Textito>n Bautista Antonio</Textito>
              <Textito className="text-sm text-gray-700">CEO</Textito>
            </View>
            {/* Añadir más miembros del equipo según sea necesario */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default QuienesSomos;

// QuienesSomos.jsx
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const QuienesSomos = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-4xl font-bold text-center text-blue-600 mb-4">Quiénes Somos</Text>

        {/* Sección de Misión */}
        <View className="my-4">
          <Text className="text-2xl font-semibold text-blue-500 mb-2">Misión</Text>
          <Text className="text-lg text-gray-700">
            En RoboPits, nuestra misión es proporcionar componentes electrónicos de alta calidad
            que impulsen la innovación y el desarrollo tecnológico, apoyando a ingenieros y
            entusiastas en la creación de proyectos que transformen el futuro.
          </Text>
        </View>

        {/* Sección de Visión */}
        <View className="my-4">
          <Text className="text-2xl font-semibold text-blue-500 mb-2">Visión</Text>
          <Text className="text-lg text-gray-700">
            Aspiramos a ser líderes Regionales en la distribución de componentes electrónicos,
            facilitando el acceso a tecnología avanzada y contribuyendo al avance global en la
            robótica y la automatización.
          </Text>
        </View>

        {/* Sección de Valores */}
        <View className="my-4">
          <Text className="text-2xl font-semibold text-blue-500 mb-2">Valores</Text>
          <View className="ml-4">
            <Text className="text-lg text-gray-700 mb-1">• Innovación: Fomentamos un ambiente creativo y promovemos soluciones innovadoras.</Text>
            <Text className="text-lg text-gray-700 mb-1">• Calidad: Nos comprometemos a ofrecer productos que cumplen con los más altos estándares.</Text>
            <Text className="text-lg text-gray-700 mb-1">• Integridad: Actuamos con honestidad y responsabilidad en todas nuestras acciones.</Text>
            <Text className="text-lg text-gray-700 mb-1">• Colaboración: Trabajamos juntos para alcanzar metas comunes y superar desafíos.</Text>
            <Text className="text-lg text-gray-700 mb-1">• Satisfacción del Cliente: Nos dedicamos a satisfacer y superar las expectativas de nuestros clientes.</Text>
          </View>
        </View>

        {/* Sección de Equipo */}
        <View className="my-4">
          <Text className="text-2xl font-semibold text-blue-500 mb-2">Nuestro Equipo</Text>
          <Text className="text-lg text-gray-700 mb-4">
            Nuestro equipo está compuesto por profesionales apasionados y expertos en tecnología
            que comparten un compromiso por la excelencia y la innovación.
          </Text>
          <View className="flex flex-wrap justify-center">
            <View className="bg-white shadow-md rounded-lg p-4 m-4 max-w-xs items-center">
              <Image
                className="w-24 h-24 rounded-full mb-4"
                source={require('../assets/logo-robopits.png')}
              />
              <Text className="text-xl font-semibold">Ing Oscar Ivan Bautista Antonio</Text>
              <Text className="text-gray-600">CEO</Text>
            </View>
            {/* Añadir más miembros del equipo según sea necesario */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default QuienesSomos;

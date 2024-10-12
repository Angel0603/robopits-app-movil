import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Textito from './Textito'; 

const CustomInput = ({ placeholderText, icon: IconComponent, className = '', inputStyle = '', secureTextEntry = false }) => {
  const [value, setValue] = useState('');

  return (
    <View className={`relative flex-row items-center border border-[#EBF0FF] rounded-md ${className}`}>
      {/* Icono pasado como prop */}
      {IconComponent && <IconComponent className="p-4" />}
      
      {/* Campo de texto */}
      <TextInput
        value={value}
        onChangeText={setValue}
        className={`flex-1 ml-2 text-base text-black ${inputStyle}`} // Aplicar estilos a través de nativewind
        style={{
          fontFamily: 'Poppins', // Aplicar la fuente de manera fija
        }}
        keyboardType="default"
        autoCapitalize="none"
        secureTextEntry={secureTextEntry} // Aquí se pasa el prop para ocultar o mostrar el texto
        placeholder=""
      />

      {/* Placeholder simulado usando Textito */}
      {!value && (
        <Textito className="absolute left-10 text-gray-400 pl-6 " fontFamily="Poppins">
          {placeholderText}
        </Textito>
      )}
    </View>
  );
};

export default CustomInput;

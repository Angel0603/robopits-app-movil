import React, { useState } from 'react';
import { View, TextInput, Image } from 'react-native';
import { SearchIcon } from './Icons';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View className="w-10/12 h-2/5 flex-row items-center p-4 border border-[#EBF0FF] rounded-md bg-white">
            {/* Ícono de búsqueda */}
            <SearchIcon className="w-6 h-6" />
            {/* Campo de entrada para la búsqueda */}
            <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Buscar un producto en RoboPits"
                style={{
                    flex: 1,
                    height : 40,
                    marginLeft: 8,
                    fontFamily: 'Poppins', // Asegúrate de que la fuente Poppins está cargada en tu proyecto
                    fontSize: 14,
                    color: '#223263' // Color del texto
                }}
                placeholderTextColor="#9098B1" // Color del placeholder
            />
        </View>
    );
};

export default SearchBar;

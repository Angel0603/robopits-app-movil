import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { styled } from 'nativewind';

import ApiService from '../lib/ApiService.js';
import Textito from '../components/Textito.jsx';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);

    const showData = async () => {
        try {
            const response = await ApiService.getInstance().fetchData('Categorias');
            setCategorias(response);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    useEffect(() => {
        showData();
    }, []);

    return (
        <StyledView className="flex-1 p-2.5 bg-white">
            <ScrollView>
                <StyledView className="flex flex-row flex-wrap justify-center">
                    {categorias.map((categoria) => (
                        <StyledPressable key={categoria._id} onPress={() => console.log('Navigate to:', categoria._id)} className="bg-gray-100 border border-gray-200 rounded-lg shadow-md p-2.5 m-1.5 w-5/6 md:w-5/12">
                            <StyledView className="items-center">
                                <Textito className="text-lg" fontFamily='PoppinsBold'>{categoria.NameCategoria}</Textito>
                                <Textito className="pt-1.5 text-center text-sm">¡Échale un vistazo a nuestras categorías!</Textito>
                            </StyledView>
                        </StyledPressable>
                    ))}
                </StyledView>
            </ScrollView>
        </StyledView>
    );
};

export default Categorias;

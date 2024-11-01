import { View, Pressable, ScrollView } from 'react-native';
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
        <StyledView className="flex-1 p-2.5 bg-[#eff9ff]">
            <ScrollView>
                <StyledView className="flex flex-row flex-wrap justify-center">
                    {categorias.map((categoria) => (
                        <StyledPressable
                            key={categoria._id}
                            onPress={() => console.log('Navigate to:', categoria._id)}
                            className="bg-white border border-gray-200 rounded-lg p-4 m-2 w-5/6 md:w-5/12 items-center justify-center transition transform duration-150 ease-in-out active:scale-95"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.3,
                                shadowRadius: 5,
                                elevation: 8,
                            }}
                        >
                            <Textito className="text-lg text-[#2587eb]" fontFamily="PoppinsBold">
                                {categoria.NameCategoria}
                            </Textito>
                            <Textito className="pt-1.5 text-center text-sm text-gray-600">
                                ¡Échale un vistazo a nuestras categorías!
                            </Textito>
                        </StyledPressable>
                    ))}
                </StyledView>
            </ScrollView>
        </StyledView>
    );
};

export default Categorias;

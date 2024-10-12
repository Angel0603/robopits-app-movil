import React from 'react';
import { View, Image, Pressable } from 'react-native';
import CustomInput from '../components/CustomInput';
import Textito from '../components/Textito';
import { styled } from 'nativewind';
import { EmailIcon } from '../components/Icons';
import { Link } from 'expo-router';

const StyledPressable = styled(Pressable);

const RecuperarContrasena = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Image source={require('../assets/logo-robopits.png')} className="w-28 h-28" />

            <Textito className="text-2xl font-bold text-[#223263]/95 mt-5" fontFamily='Poppins'>
                Restablecer Contraseña
            </Textito>

            <Textito className="text-sm text-[#9098B1] my-8 w-4/5 text-center">
                ¡Hola! Si olvidaste tu contraseña, no te preocupes; te enviaremos un correo electrónico con las instrucciones que debes seguir para restablecerla. El enlace para restablecer tu contraseña solo durará 2 minutos.
            </Textito>

            <View className="w-11/12">
                <CustomInput
                    placeholderText="Ingrese su email"
                    icon={EmailIcon}
                    inputStyle="text-lg h-12"
                />
            </View>

            <StyledPressable
                className="w-11/12 h-14 items-center justify-center bg-[#3BA4F6] rounded-md mt-6 active:bg-[#3BA4F6]/80 active:opacity-80"
            >
                <Textito className="text-white text-lg font-bold">
                    Restablecer
                </Textito>
            </StyledPressable>

            <StyledPressable className="mt-5 active:opacity-50">
                <Link href="/login" asChild>
                    <Textito className="text-sm text-[#3BA4F6] font-bold">
                        Regresar
                    </Textito>
                </Link>
            </StyledPressable>
        </View>
    )
}

export default RecuperarContrasena
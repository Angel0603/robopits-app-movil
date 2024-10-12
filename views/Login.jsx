import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import CustomInput from '../components/CustomInput';
import { EmailIcon, PasswordIcon, EyeIcon, EyeOffIcon } from '../components/Icons'; // Importar los íconos de ojos
import Textito from '../components/Textito';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

const StyledPressable = styled(Pressable);

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Image source={require('../assets/logo-robopits.png')} className="w-28 h-28" />

            <Textito className="text-2xl font-bold text-[#223263]/95 mt-5" fontFamily='Poppins'>
                Bienvenido a RoboPits
            </Textito>

            <Textito className="text-sm text-[#9098B1] mt-5">
                Inicia sesión para continuar
            </Textito>

            <View className="w-11/12 mt-14">
                <CustomInput
                    placeholderText="Ingrese su email"
                    icon={EmailIcon}
                    inputStyle="text-lg h11/12"
                />
            </View>

            {/* Input de contraseña con ícono de ojo */}
            <View className="w-11/12 mt-3 relative">
                <CustomInput
                    placeholderText="Ingrese su contraseña"
                    icon={PasswordIcon}
                    secureTextEntry={!isPasswordVisible} // Controla la visibilidad de la contraseña
                    inputStyle="text-lg h-12 pr-10" // Espacio para el ícono de ojo
                />
                
                {/* Botón para mostrar/ocultar contraseña */}
                <Pressable onPress={togglePasswordVisibility} className="absolute right-3 top-4">
                    {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </Pressable>
            </View>

            <StyledPressable
                className="w-11/12 h-14 items-center justify-center bg-[#3BA4F6] rounded-md mt-6 active:bg-[#3BA4F6]/80 active:opacity-80"
            >
                <Textito className="text-white text-lg font-bold">
                    Iniciar sesión
                </Textito>
            </StyledPressable>

            <StyledPressable className="mt-2 active:opacity-50">
                <Link href="/recuperarContrasena" asChild>
                    <Textito className="text-sm text-[#3BA4F6] mt-5 font-bold">
                        ¿Olvidaste tu contraseña?
                    </Textito>
                </Link>
            </StyledPressable>

            {/* Centrar verticalmente el texto de registro */}
            <View className="flex-row mt-5 items-center">
                <Textito className="text-sm text-[#9098B1]">
                    ¿No tienes una cuenta?
                </Textito>
                <StyledPressable className="ml-1 active:opacity-50">
                    <Link href="/registro" asChild>
                        <Textito className="text-[#3BA4F6] font-bold">
                            Registrate
                        </Textito>
                    </Link>
                </StyledPressable>
            </View>
        </View>
    );
};

export default Login;

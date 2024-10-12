import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import CustomInput from '../components/CustomInput';
import { EmailIcon, PasswordIcon, EyeIcon, EyeOffIcon, UserIcon } from '../components/Icons'; // Importar los íconos
import Textito from '../components/Textito';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

const StyledPressable = styled(Pressable);

const Registro = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordVisibleAgain, setIsPasswordVisibleAgain] = useState(false);

    // Funciones para alternar la visibilidad de las contraseñas
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const togglePasswordVisibilityAgain = () => {
        setIsPasswordVisibleAgain(!isPasswordVisibleAgain);
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            {/* Logo */}
            <Image source={require('../assets/logo-robopits.png')} className="w-28 h-28" />

            {/* Título */}
            <Textito className="text-2xl font-bold text-[#223263]/95 mt-5" fontFamily="Poppins">
                ¡Comencemos!
            </Textito>

            {/* Subtítulo */}
            <Textito className="text-sm text-[#9098B1] mt-2">
                Crea una nueva cuenta
            </Textito>

            {/* Full Name Input */}
            <View className="w-11/12 mt-5">
                <CustomInput
                    placeholderText="Ingrese su nombre completo"
                    icon={UserIcon} // Aquí podrías usar un ícono personalizado de usuario
                    inputStyle="text-lg h11/12"
                />
            </View>

            {/* Email Input */}
            <View className="w-11/12 mt-3">
                <CustomInput
                    placeholderText="Ingrese su email"
                    icon={EmailIcon}
                    inputStyle="text-lg h11/12"
                />
            </View>

            {/* Password Input con ícono de ojo */}
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

            {/* Confirm Password Input con ícono de ojo */}
            <View className="w-11/12 mt-3 relative">
                <CustomInput
                    placeholderText="Confirme su contraseña"
                    icon={PasswordIcon}
                    secureTextEntry={!isPasswordVisibleAgain} // Controla la visibilidad de la segunda contraseña
                    inputStyle="text-lg h-12 pr-10" // Espacio para el ícono de ojo
                />
                {/* Botón para mostrar/ocultar contraseña */}
                <Pressable onPress={togglePasswordVisibilityAgain} className="absolute right-3 top-4">
                    {isPasswordVisibleAgain ? <EyeIcon /> : <EyeOffIcon />}
                </Pressable>
            </View>

            {/* Sign Up Button */}
            <StyledPressable
                className="w-11/12 h-14 items-center justify-center bg-[#3BA4F6] rounded-md mt-6 active:bg-[#3BA4F6]/80 active:opacity-80"
            >
                <Textito className="text-white text-lg font-bold">
                    Registrarse
                </Textito>
            </StyledPressable>

            {/* Sign In Link */}
            <View className="flex-row mt-5 items-center">
                <Textito className="text-sm text-[#9098B1]">
                    ¿Ya tienes una cuenta?
                </Textito>
                <StyledPressable className="ml-1 active:opacity-50">
                    <Link href="/login" asChild>    
                        <Textito className="text-[#3BA4F6] font-bold">
                            Iniciar sesión
                        </Textito>
                    </Link>
                </StyledPressable>
            </View>
        </View>
    );
};

export default Registro;

import React, { useState } from 'react';
import { View, Image, Pressable, Alert } from 'react-native';
import { EmailIcon, PasswordIcon, EyeIcon, EyeOffIcon } from '../components/Icons';
import { styled } from 'nativewind';
import { Link, useRouter } from 'expo-router';
import { showMessage } from "react-native-flash-message";

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../lib/ApiService'; // Importa tu servicio API para manejar las peticiones
import CustomInput from '../components/CustomInput';
import Textito from '../components/Textito';

const StyledPressable = styled(Pressable);

const Login = () => {
    const [userName, setUserName] = useState(''); // Estado para almacenar el nombre del usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const router = useRouter();  // Hook para la navegación

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = async () => {
        console.log('Attempting login with:', 'Email: ' + email, 'Password: ' + password); // Muestra los valores ingresados
    
        try {
            const response = await ApiService.getInstance().fetchData('login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Email: email.trim(), Password: password.trim() })
            });
    
            console.log('Response:', response);
    
            if (response.message === 'Inicio de sesión exitoso') {
                const userId = await AsyncStorage.getItem('id'); // Obtén el ID del usuario
                console.log("User ID:", userId);
                if (userId) {
                  const userData = await ApiService.getInstance().fetchData(`perfil/${userId}`);
                  setUserName(userData.nombre); // Actualiza el estado con el nombre del usuario
                  showMessage({
                    message: "Usuario verificado correctamente",
                    description: `Bienvenido, ${userData.nombre}!`,
                    type: "success",
                    icon: "success",
                    duration: 3000,
                  });
                }
    
                // Guarda el token o el identificador de sesión en AsyncStorage
                await AsyncStorage.setItem('id', response.id);
    
                // Navega a la pantalla de inicio después de un pequeño retraso para que el mensaje se muestre completamente
                setTimeout(() => {
                    router.push('/home');
                }, 1000);
            }else if(response.message === 'Contraseña incorrecta'){
                showMessage({
                    message: "Verifica tu contraseña",
                    description: response.message || "La contraseña es incorrecta.",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                });
            }
            else if(response.message === 'Usuario no encontrado'){
                showMessage({
                    message: "Verifica tu correo o contraseña",
                    description: response.message || "La contraseña o el correo es incorrecto.",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                });
            } else {
                showMessage({
                    message: "Error",
                    description: response.message || "Ops... algo salió mal.",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                });
            }
        } catch (error) {
            console.error('Login Error:', error);
            showMessage({
                message: "Error de Conexión",
                description: "No se pudo conectar al servidor.",
                type: "danger",
                icon: "danger",
                duration: 3000,
            });
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Image source={require('../assets/logo-robopits.png')} className="w-28 h-28" />
            <Textito className="text-2xl text-[#223263]/95 mt-5" fontFamily='PoppinsBold'>
                Bienvenido a RoboPits
            </Textito>
            <Textito className="text-sm text-[#9098B1] mt-5">
                Inicia sesión para continuar
            </Textito>
            <View className="w-11/12 mt-14">
                <CustomInput
                    placeholderText="Ingrese su email"
                    icon={EmailIcon}
                    onChangeText={setEmail}
                    value={email}
                />
            </View>
            <View className="w-11/12 mt-3 relative">
                <CustomInput
                    placeholderText="Ingrese su contraseña"
                    icon={PasswordIcon}
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={setPassword}
                    value={password}
                />
                <Pressable onPress={togglePasswordVisibility} className="absolute right-3 top-4">
                    {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </Pressable>
            </View>
            <StyledPressable
                onPress={handleLogin}
                className="w-11/12 h-14 items-center justify-center bg-[#3BA4F6] rounded-md mt-6 active:bg-[#3BA4F6]/80 active:opacity-80"
            >
                <Textito className="text-white text-lg" fontFamily='PoppinsBold'>
                    Iniciar sesión
                </Textito>
            </StyledPressable>
            <StyledPressable className="mt-2 active:opacity-50">
                <Link href="/recuperarContrasena" asChild>
                    <Textito className="text-sm text-[#3BA4F6] mt-5" fontFamily='PoppinsBold'>
                        ¿Olvidaste tu contraseña?
                    </Textito>
                </Link>
            </StyledPressable>
            <View className="flex-row mt-5 items-center">
                <Textito className="text-sm text-[#9098B1]">
                    ¿No tienes una cuenta?
                </Textito>
                <StyledPressable className="ml-1 active:opacity-50">
                    <Link href="/registro" asChild>
                        <Textito className="text-[#3BA4F6]" fontFamily='PoppinsBold'>
                            Registrate
                        </Textito>
                    </Link>
                </StyledPressable>
            </View>
        </View>
    );
};

export default Login;

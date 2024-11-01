import React, { useState } from 'react';
import { View, Image, Pressable, Alert } from 'react-native';
import { EmailIcon, PasswordIcon, EyeIcon, EyeOffIcon } from '../components/Icons';
import { styled } from 'nativewind';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../lib/ApiService'; // Importa tu servicio API para manejar las peticiones
import CustomInput from '../components/CustomInput';
import Textito from '../components/Textito';

const StyledPressable = styled(Pressable);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const router = useRouter();  // Hook para la navegación

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = async () => {
        console.log('Attempting login with:', 'Email: ' + email, 'Password: ' + password); // This should show the entered values

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
                Alert.alert("Bienvenido", "Usuario verificado correctamente.");

                // Guarda el token o el identificador de sesión en AsyncStorage
                await AsyncStorage.setItem('id', response.id); // response.token asumiendo que tu API devuelve el token de autenticación

                router.push('/home');  // Navega a la pantalla de inicio
            } else {
                Alert.alert("Error", response.message || "Ops... algo salió mal.");
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert("Error de Conexión", "No se pudo conectar al servidor.");
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

import React, { useState } from 'react';
import { View, Image, Pressable, Alert, AsyncStorage } from 'react-native';
import { EmailIcon, PasswordIcon, EyeIcon, EyeOffIcon } from '../components/Icons';
import { styled } from 'nativewind';
import { Link } from 'expo-router';

import CustomInput from '../components/CustomInput';
import Textito from '../components/Textito';

const StyledPressable = styled(Pressable);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = async () => {
        console.log('Attempting login with:', 'Email: ' + email, 'Password: ' + password); // This should show the entered values
    
        try {
            const response = await fetch('https://back-end-robopits.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Email: email, Password: password })
            });
            const json = await response.json();
            console.log('Response:', json);
    
            if (response.status === 200) {
                Alert.alert("Binevenido", "Inicio de sesión exitoso.");
            } else {
                Alert.alert("Error", json.message || "No se pudo iniciar sesión.");
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

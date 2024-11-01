import React, { useState } from 'react';
import { View, Image, Pressable, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import { EmailIcon, PasswordIcon, EyeIcon, EyeOffIcon, UserIcon } from '../components/Icons';
import Textito from '../components/Textito';
import { styled } from 'nativewind';
import ApiService from '../lib/ApiService'; // Importa tu servicio API para manejar las peticiones
import { Link, useRouter } from 'expo-router';

const StyledPressable = styled(Pressable);

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordVisibleAgain, setIsPasswordVisibleAgain] = useState(false);

    const router = useRouter();

    // Función para alternar la visibilidad de las contraseñas
    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const togglePasswordVisibilityAgain = () => setIsPasswordVisibleAgain(!isPasswordVisibleAgain);

    // Función para manejar el registro
    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        try {
            // Llamada a ApiService con las opciones correctas
            const response = await ApiService.getInstance().fetchData('register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Nombre: nombre.trim(), Email: email.trim(), Password: password.trim() }),
                credentials: 'include', // Asegura que las cookies se envíen correctamente
            });

            console.log("Respuesta recibida:", response);

            if (response?.id) {
                Alert.alert("Registro Exitoso", "Cuenta creada satisfactoriamente.");
                // Limpiar los campos después del registro exitoso
                setNombre('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                router.push('/login'); // Redirige al login después del registro
            }else if(response == "el correo ya esta en uso"){
                Alert.alert("No se pudo registrar", response.message || "El correo ya se encuentra registrado.");
            }
            else {
                Alert.alert("Error de Registro", response.message || "No se pudo crear la cuenta.");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            Alert.alert("Error", "Hubo un problema con el registro. Por favor, intenta más tarde.");
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Image source={require('../assets/logo-robopits.png')} className="w-28 h-28" />
            <Textito className="text-2xl text-[#223263]/95 mt-5" fontFamily='PoppinsBold'>
                ¡Comencemos!
            </Textito>
            <Textito className="text-sm text-[#9098B1] mt-2">Crea una nueva cuenta</Textito>

            {/* Nombre Completo */}
            <View className="w-11/12 mt-5">
                <CustomInput
                    placeholderText="Ingrese su nombre completo"
                    icon={UserIcon}
                    value={nombre}
                    onChangeText={setNombre}
                    inputStyle="text-lg h-12"
                />
            </View>

            {/* Email */}
            <View className="w-11/12 mt-3">
                <CustomInput
                    placeholderText="Ingrese su email"
                    icon={EmailIcon}
                    value={email}
                    onChangeText={setEmail}
                    inputStyle="text-lg h-12"
                />
            </View>

            {/* Contraseña */}
            <View className="w-11/12 mt-3 relative">
                <CustomInput
                    placeholderText="Ingrese su contraseña"
                    icon={PasswordIcon}
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                    inputStyle="text-lg h-12 pr-10"
                />
                <Pressable onPress={togglePasswordVisibility} className="absolute right-3 top-4">
                    {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                </Pressable>
            </View>

            {/* Confirmar Contraseña */}
            <View className="w-11/12 mt-3 relative">
                <CustomInput
                    placeholderText="Confirme su contraseña"
                    icon={PasswordIcon}
                    secureTextEntry={!isPasswordVisibleAgain}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    inputStyle="text-lg h-12 pr-10"
                />
                <Pressable onPress={togglePasswordVisibilityAgain} className="absolute right-3 top-4">
                    {isPasswordVisibleAgain ? <EyeIcon /> : <EyeOffIcon />}
                </Pressable>
            </View>

            {/* Botón de Registro */}
            <StyledPressable
                onPress={handleRegister}
                className="w-11/12 h-14 items-center justify-center bg-[#3BA4F6] rounded-md mt-6 active:bg-[#3BA4F6]/80 active:opacity-80"
            >
                <Textito className="text-white text-lg" fontFamily='PoppinsBold'>
                    Registrarse
                </Textito>
            </StyledPressable>

            {/* Enlace a Iniciar Sesión */}
            <View className="flex-row mt-5 items-center">
                <Textito className="text-sm text-[#9098B1]">¿Ya tienes una cuenta?</Textito>
                <StyledPressable className="ml-1 active:opacity-50">
                    <Link href="/login" asChild>
                        <Textito className="text-[#3BA4F6]" fontFamily='PoppinsBold'>
                            Iniciar sesión
                        </Textito>
                    </Link>
                </StyledPressable>
            </View>
        </View>
    );
};

export default Registro;

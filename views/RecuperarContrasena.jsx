import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import CustomInput from '../components/CustomInput';
import Textito from '../components/Textito';
import { styled } from 'nativewind';
import { EmailIcon } from '../components/Icons';
import { Link } from 'expo-router';
import ApiService from '../lib/ApiService'; // Asegúrate de tener ApiService configurado para llamadas a la API
import { showMessage } from 'react-native-flash-message';

const StyledPressable = styled(Pressable);

const RecuperarContrasena = () => {
    const [email, setEmail] = useState(''); // Estado para el email
    const [loading, setLoading] = useState(false);

    // Función para manejar la recuperación de contraseña
    const handleForgotPassword = async () => {
        if (!email) {
            showMessage({
                message: "Error",
                description: "Por favor, ingresa tu correo electrónico.",
                type: "danger",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await ApiService.getInstance().fetchData('forgorPassword', {
                method: 'POST',
                body: JSON.stringify({ Email: email }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.message === "Correo electrónico de restablecimiento de contraseña enviado.") {
                showMessage({
                    message: "Correo enviado",
                    description: "Revisa tu bandeja de entrada para el enlace de restablecimiento.",
                    type: "success",
                });
            } else {
                showMessage({
                    message: "Error",
                    description: response.message || "No se pudo enviar el correo electrónico.",
                    type: "danger",
                });
            }
        } catch (error) {
            console.error("Error en forgotPassword:", error);
            showMessage({
                message: "Error",
                description: "Hubo un problema al enviar el correo electrónico.",
                type: "danger",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Image source={require('../assets/logo-robopits.png')} className="w-28 h-28" />

            <Textito className="text-2xl text-[#223263]/95 mt-5" fontFamily='PoppinsBold'>
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
                    value={email}
                    onChangeText={setEmail} // Actualiza el estado del email
                />
            </View>

            <StyledPressable
                onPress={handleForgotPassword}
                disabled={loading}
                className={`w-11/12 h-14 items-center justify-center ${loading ? 'bg-gray-400' : 'bg-[#3BA4F6]'} rounded-md mt-6 active:bg-[#3BA4F6]/80 active:opacity-80`}
            >
                <Textito className="text-white text-lg" fontFamily='PoppinsBold'>
                    {loading ? 'Enviando...' : 'Restablecer'}
                </Textito>
            </StyledPressable>

            <StyledPressable className="mt-5 active:opacity-50">
                <Link href="/login" asChild>
                    <Textito className="text-sm text-[#3BA4F6]" fontFamily='PoppinsBold'>
                        Regresar
                    </Textito>
                </Link>
            </StyledPressable>
        </View>
    );
};

export default RecuperarContrasena;

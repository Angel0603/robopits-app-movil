import { Image, View } from 'react-native'
import React from 'react'
import Textito from '../components/Textito'

const Login = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Image source={require('../assets/logo-robopits.png')} className="w-28 h-28" />
            <Textito className="text-2xl font-bold text-[#223263]/95 mt-5" fontFamily='Poppins'>Bienvenido a RoboPits</Textito>
            <Textito className="text-sm text-[#9098B1] mt-5">Inicia sesión para continuar</Textito>
            
        </View>
    )
}

export default Login
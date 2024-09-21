import React from 'react'
import { Stack } from 'expo-router'
import { FontProvider } from '../../components/FontContext'

const RootLayout = () => {
    return (
        <FontProvider>
            <Stack screenOptions={{ 
                headerShown: false,
                headerTitle:"",
            }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="splash" options={{ headerShown: false }} />
            </Stack>
        </FontProvider>
    )
}

export default RootLayout


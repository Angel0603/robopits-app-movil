import { View, Text } from 'react-native'

import React from 'react'
import ImageCarousel from '../components/ImageCarousel'

const Home = () => {

    return (
        <View className="flex-1 bg-white w-full items-center">
            <View className="w-full">
                <ImageCarousel />
            </View>
        </View>
    )
}

export default Home
import { View } from 'react-native'
import { Link } from 'expo-router'
import { Pressable } from 'react-native'
import { CartIcon } from '../components/Icons'
import React from 'react'
import SearchBar from './SearchBar'

const Header = () => {
    return (
        <View className='w-full h-32 border-b border-[#EBF0FF] bg-white'>
            <View className='flex-row h-36 mt-5 pb-2.5 justify-between items-center px-5'>
            <SearchBar />
            <View>
                <Link href="/carrito" asChild>
                    <Pressable>
                        <CartIcon />
                    </Pressable>
                </Link>
            </View>
            </View>
        </View>
    )
}

export default Header
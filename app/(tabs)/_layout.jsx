import { CartIcon, HeartIcon, HomeIcon, TagIcon, UserIcon } from '../../components/Icons'
import { Tabs } from 'expo-router'

const RootLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: 'white', borderTopColor: '#b0b0b0', height: 85, paddingVertical: 8, alignItems: 'center', justifyContent: 'center' },
                tabBarActiveTintColor: '#3ba4f6',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                },
                //headerTransparent: true, //para dejar el header transparente
            }}
        >

            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                    title: 'Home'
                }}
            />

            <Tabs.Screen
                name="favoritos"
                options={{
                    tabBarIcon: ({ color }) => <HeartIcon color={color} />,
                    title: 'Favoritos'
                }}
            />

            <Tabs.Screen
                name="carrito"
                options={{
                    tabBarIcon: ({ color }) => <CartIcon color={color} />,
                    title: 'Carrito'
                }}
            />

            <Tabs.Screen
                name="ofertas"
                options={{
                    tabBarIcon: ({ color }) => <TagIcon color={color} />,
                    title: 'Ofertas'
                }}
            />

            <Tabs.Screen
                name="perfil"
                options={{
                    tabBarIcon: ({ color }) => <UserIcon color={color} />,
                    title: 'Perfil'
                }}
            />

        </Tabs>
    )
}

export default RootLayout
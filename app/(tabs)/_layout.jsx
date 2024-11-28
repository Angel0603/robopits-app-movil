import { HeartIcon, HomeIcon, MenuIcon, PedidosIcon, TagIcon } from '../../components/Icons'
import { Tabs } from 'expo-router'
import Header from '../../components/Header';

const RootLayout = () => {
    return (
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: 'white', borderTopColor: '#EBF0FF', alignItems: 'center', justifyContent: 'center', paddingTop: 5, borderTopWidth: 1 },
                    tabBarActiveTintColor: '#3ba4f6',
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        fontFamily: 'Poppins'
                    },
                    //headerTransparent: true, //para dejar el header transparente
                }}
            >

                <Tabs.Screen
                    name="home"
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header />
                          ),
                        tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                        title: 'Inicio'
                    }}
                />

                <Tabs.Screen
                    name="favoritos"
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header />
                          ),
                        tabBarIcon: ({ color }) => <HeartIcon color={color} />,
                        title: 'Favoritos'
                    }}
                />

                <Tabs.Screen
                    name="ofertas"
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header />
                          ),
                        tabBarIcon: ({ color }) => <TagIcon color={color} />,
                        title: 'Ofertas'
                    }}
                />

                <Tabs.Screen
                    name="pedidos"
                    options={{
                        headerShown: true,
                        header: () => (
                            <Header />
                          ),
                        tabBarIcon: ({ color }) => <PedidosIcon color={color} />,
                        title: 'Pedidos'
                    }}
                />

                <Tabs.Screen
                    name="menu"
                    options={{
                        tabBarIcon: ({ color }) => <MenuIcon color={color} />,
                        title: 'Más'
                    }}
                />
            </Tabs>
    )
}

export default RootLayout
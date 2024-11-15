import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, ActivityIndicator, Pressable, RefreshControl, Modal, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import ApiService from '../lib/ApiService.js';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Textito from '../components/Textito.jsx';
import { DecrementIcon, DeleteIcon, IncrementIcon } from '../components/Icons.jsx';
import { useStripe } from '@stripe/stripe-react-native';

const StyledView = styled(View);
const StyledPressable = styled(Pressable);

const Carrito = () => {
    const [carritoItems, setCarritoItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [total, setTotal] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [puntoDeEntrega, setPuntoDeEntrega] = useState("");
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [isPaymentSheetReady, setIsPaymentSheetReady] = useState(false);

    const fetchCarrito = async () => {
        try {
            const userId = await AsyncStorage.getItem('id');
            if (!userId) throw new Error("No se encontró el ID de usuario en AsyncStorage");

            const response = await ApiService.getInstance().fetchData(`carrito/${userId}`);
            const items = response?.carrito?.items || [];
            setCarritoItems(items);

            // Calcula el total
            const totalPrecio = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotal(totalPrecio);
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            showMessage({
                message: "Error",
                description: "No se pudo obtener los productos del carrito.",
                type: "danger",
            });
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCarrito();
    }, []);

    // Función para refrescar la página
    const onRefresh = () => {
        setRefreshing(true);
        fetchCarrito();
    };

    // Lógica de Stripe para inicializar y abrir la Payment Sheet
    const fetchPaymentSheetParams = async () => {
        try {
            const data = await ApiService.getInstance().fetchData(`hoja-de-pago`, {
                method: 'POST',
                body: JSON.stringify({ amount: total * 100 }), // Stripe espera el monto en centavos
            });

            const { paymentIntent, ephemeralKey, customer } = data;
            if (!paymentIntent || !ephemeralKey || !customer) throw new Error("Faltan parámetros de la Payment Sheet.");

            return { paymentIntent, ephemeralKey, customer };
        } catch (error) {
            console.error("Error obteniendo parámetros de la Payment Sheet:", error);
            showMessage({ message: "Error", description: "Problema al configurar el pago.", type: "danger" });
        }
    };

    const initializePaymentSheet = async () => {
        const paymentParams = await fetchPaymentSheetParams();
        if (!paymentParams) return;

        const { paymentIntent, ephemeralKey, customer } = paymentParams;
        const { error } = await initPaymentSheet({
            merchantDisplayName: "RoboPits",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            returnURL: "robopitsapp://payment-return", // Cambia esto a tu esquema de URL personalizado para jale en iOS
        });

        if (error) {
            console.error("Error al inicializar la Payment Sheet:", error);
            setIsPaymentSheetReady(false);
        } else {
            setIsPaymentSheetReady(true);
        }
    };
    
    const openPaymentSheet = async () => {

        // Asegúrate de que siempre configuras un nuevo flujo de pago
        setIsPaymentSheetReady(false);

        // Vuelve a inicializar la Payment Sheet para obtener un nuevo paymentIntent
        await initializePaymentSheet();

        if (!isPaymentSheetReady) {
            showMessage({
                message: "Espere",
                description: "Configurando el pago, intente de nuevo.",
                type: "info",
            });
            return;
        }

        const { error } = await presentPaymentSheet();

        if (error) {
            showMessage({
                message: `Ups... Vuelva pronto.`,
                description: 'El pago ha sido cancelado.',
                type: "danger",
            });
        } else {
            showMessage({
                message: "Gracias, vuelva pronto.",
                description: "¡Tu pedido está confirmado!",
                type: "success",
            });
        }
    };

    const handleIncrement = async (productId) => {
        try {
            const userId = await AsyncStorage.getItem('id');
            await ApiService.getInstance().fetchData('carrito/increment', {
                method: 'POST',
                body: JSON.stringify({ userId, productId }),
            });

            setCarritoItems(prevCarrito =>
                prevCarrito.map(item =>
                    item.productId._id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
            setTotal(prevTotal => prevTotal + carritoItems.find(item => item.productId._id === productId).price);
        } catch (error) {
            console.error("Error al incrementar la cantidad:", error);
            showMessage({
                message: "Error",
                description: "No se pudo incrementar la cantidad del producto.",
                type: "danger",
            });
        }
    };

    const handleDecrement = async (productId) => {
        try {
            const userId = await AsyncStorage.getItem('id');
            await ApiService.getInstance().fetchData('carrito/decrement', {
                method: 'POST',
                body: JSON.stringify({ userId, productId }),
            });

            setCarritoItems(prevCarrito =>
                prevCarrito.map(item =>
                    item.productId._id === productId && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
            setTotal(prevTotal => prevTotal - carritoItems.find(item => item.productId._id === productId).price);
        } catch (error) {
            console.error("Error al decrementar la cantidad:", error);
            showMessage({
                message: "Error",
                description: "No se pudo decrementar la cantidad del producto.",
                type: "danger",
            });
        }
    };

    const handleRemove = async (productId) => {
        try {
            const userId = await AsyncStorage.getItem('id');
            await ApiService.getInstance().fetchData('carrito/remove', {
                method: 'POST',
                body: JSON.stringify({ userId, productId }),
            });

            const removedItem = carritoItems.find(item => item.productId._id === productId);
            setCarritoItems(prevCarrito =>
                prevCarrito.filter(item => item.productId._id !== productId)
            );
            setTotal(prevTotal => prevTotal - (removedItem.price * removedItem.quantity));

            showMessage({
                message: "Producto eliminado",
                description: "El producto ha sido eliminado del carrito.",
                type: "success",
            });
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            showMessage({
                message: "Error",
                description: "No se pudo eliminar el producto del carrito.",
                type: "danger",
            });
        }
    };

    // Función para abrir el modal de punto de entrega
    const abrirModalPuntoDeEntrega = () => setModalVisible(true);

    // Función para seleccionar el punto de entrega
    const seleccionarPuntoDeEntrega = (punto) => {
        setPuntoDeEntrega(punto);
        setModalVisible(false);
        showMessage({ message: "Punto de entrega seleccionado", description: `Has elegido: ${punto}`, type: "info" });
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#3ba4f6" />
            </View>
        );
    }

    return (
        <ScrollView
            className="p-4 bg-white"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Textito className="text-2xl font-bold text-[#223263] mb-4">Mi Carrito</Textito>

            {carritoItems.length === 0 ? (
                <View className="flex-1 justify-center items-center">
                    <Image
                        source={require('../assets/sin-ofertas.png')}
                        className="w-48 h-48 mx-auto"
                        style={{ resizeMode: 'contain' }}
                    />
                    <Textito className="text-lg text-gray-600 text-center mt-5">El carrito está vacío</Textito>
                </View>
            ) : (
                carritoItems.map((item, index) => (
                    <StyledView key={index} className="bg-white p-4 rounded-lg shadow mb-4 flex-row">
                        <Image
                            source={{ uri: item.image }}
                            className="w-36 h-36 rounded-lg mr-4"
                            style={{ resizeMode: 'contain' }}
                        />
                        <View className="flex-1">
                            <Textito className="text-lg font-bold text-[#223263]">{item.name}</Textito>
                            <Textito className="text-lg text-green-500 font-bold">${item.price.toFixed(2)}</Textito>
                            <Textito className="text-gray-600">Cantidad: {item.quantity}</Textito>

                            <View className="flex-row mt-2 space-x-2">
                                <StyledPressable onPress={() => handleIncrement(item.productId._id)}>
                                    <IncrementIcon className="text-[#3ba4f6]" size="34" />
                                </StyledPressable>
                                <StyledPressable onPress={() => handleDecrement(item.productId._id)}>
                                    <DecrementIcon className="text-[#3ba4f6]" size="34" />
                                </StyledPressable>
                                <StyledPressable onPress={() => handleRemove(item.productId._id)}>
                                    <DeleteIcon className="text-red-500" size="34" />
                                </StyledPressable>
                            </View>
                        </View>
                    </StyledView>
                ))
            )}

            {carritoItems.length > 0 && (
                <>
                    <Textito className="text-2xl font-bold text-right text-[#223263] mt-4">
                        Total: ${total.toFixed(2)}
                    </Textito>

                    {/* Botón para abrir modal de punto de entrega */}
                    <StyledPressable
                        onPress={abrirModalPuntoDeEntrega}
                        className="bg-[#4db4b2] py-4 rounded-lg items-center mt-4"
                    >
                        <Textito className="text-white text-lg font-bold">Elegir Punto de Entrega</Textito>
                    </StyledPressable>

                    {/* Modal para seleccionar punto de entrega */}
                    <Modal visible={modalVisible} transparent={true} animationType="slide">
                        <View className="flex-1 justify-center items-center bg-black/50">
                            <View className="bg-white p-4 rounded-lg w-80">
                                <Textito className="text-lg font-bold mb-4">Selecciona un punto de entrega</Textito>
                                <Pressable onPress={() => seleccionarPuntoDeEntrega("Centro de Huejutla")} className="p-2 border-b border-gray-200">
                                    <Textito>Centro de Huejutla</Textito>
                                </Pressable>
                                <Pressable onPress={() => seleccionarPuntoDeEntrega("Parque de poblamiento")} className="p-2">
                                    <Textito>Parque de poblamiento</Textito>
                                </Pressable>
                                <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-4">
                                    <Textito className="text-center text-[#3ba4f6] font-bold">Cerrar</Textito>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {/* Botón de pagar con Stripe */}
                    <StyledPressable
                        onPress={openPaymentSheet}
                        className="bg-[#3ba4f6] py-4 rounded-lg items-center mt-4 mb-10"
                    >
                        <Textito className="text-white text-lg font-bold">Pagar Ahora</Textito>
                    </StyledPressable>
                </>
            )}
        </ScrollView>
    );
};

export default Carrito;

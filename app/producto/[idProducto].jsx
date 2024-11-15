import React, { useEffect, useState, useRef } from 'react';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView, ActivityIndicator, Image, Pressable, RefreshControl, Animated, LayoutAnimation, UIManager, Platform } from "react-native";
import ApiService from '../../lib/ApiService.js';
import Textito from '../../components/Textito.jsx';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind';
import { HeartIcon } from '../../components/Icons.jsx';
import { useStripe } from '@stripe/stripe-react-native';
import { showMessage } from "react-native-flash-message";

const StyledPressable = styled(Pressable);

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedSection = ({ title, content, expanded, toggleExpanded }) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  return (
    <>
      <StyledPressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          toggleExpanded();
        }}
        className="bg-white border border-gray-200 rounded-lg p-4 mb-2 flex-row justify-between items-center"
      >
        <Textito className="text-lg font-bold text-[#223263]">{title}</Textito>
        <MaterialCommunityIcons name={expanded ? "minus-circle-outline" : "plus-circle-outline"} size={20} color="#3BA4F6" />
      </StyledPressable>
      {expanded && (
        <Animated.View className="bg-[#f2fbfa] px-4 py-2 mb-4 border border-t-0 border-gray-200 rounded-b-lg">
          <Textito className="text-base text-[#223263]/70">{content}</Textito>
        </Animated.View>
      )}
    </>
  );
};

const DetalleProducto = () => {
  const { idProducto } = useLocalSearchParams();
  const [productoInfo, setProductoInfo] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState([]); // Estado para las recomendaciones
  const [isFavorite, setIsFavorite] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  //Recomendaciones
  const fetchRecomendaciones = async () => {
    try {
      const response = await ApiService.getInstance().fetchData('recomendaciones');
      setRecomendaciones(response);
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
      showMessage({
        message: "Error",
        description: "No se pudo cargar las recomendaciones.",
        type: "danger",
      });
    }
  };

  //Carrito
  // Función para manejar el evento de agregar al carrito
  const handleAddToCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('id'); // Obtén el ID del usuario desde AsyncStorage
      const productId = idProducto;
      const quantity = 1; // Cantidad por defecto, puede cambiarse según tu lógica

      const response = await ApiService.getInstance().fetchData('carritoagregar', {
        method: 'POST',
        body: JSON.stringify({ userId, productId, quantity }),
      });

      if (response.message === "Producto agregado al carrito exitosamente") {
        showMessage({
          message: "Producto agregado",
          description: "El producto ha sido agregado al carrito exitosamente.",
          type: "success",
        });
      } else {
        showMessage({
          message: "Error",
          description: response.message || "No se pudo agregar el producto al carrito.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      showMessage({
        message: "Error",
        description: "Hubo un problema al agregar el producto al carrito.",
        type: "danger",
      });
    }
  };

  // Stripe
  const [payableAmount, setPayableAmount] = useState(null);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isPaymentSheetReady, setIsPaymentSheetReady] = useState(false);

  const fetchPaymentSheetParams = async () => {
    try {
      const data = await ApiService.getInstance().fetchData(`hoja-de-pago`, {
        method: 'POST',
        body: JSON.stringify({ amount: payableAmount })
      });

      const { paymentIntent, ephemeralKey, customer } = data;

      if (!paymentIntent || !ephemeralKey || !customer) {
        throw new Error("Faltan parámetros necesarios para la Payment Sheet.");
      }

      return { paymentIntent, ephemeralKey, customer };
    } catch (error) {
      console.error("Error obteniendo parámetros para la Payment Sheet:", error);
      showMessage({
        message: "Error",
        description: "Hubo un problema configurando el pago. Intenta más tarde.",
        type: "danger",
      });
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
      defaultBillingDetails: { name: 'Angel Lara' },
      returnURL: "robopitsapp://payment-return", // Cambia esto a tu esquema de URL personalizado
    });

    if (error) {
      console.error("Error al inicializar la Payment Sheet:", error);
      showMessage({
        message: "Error",
        description: "No se pudo inicializar el pago. Intenta de nuevo.",
        type: "danger",
      });
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

  useEffect(() => {
    const setupPayment = async () => {
      await initializePaymentSheet();
    };
    if (payableAmount !== null) { // Espera a que payableAmount tenga un valor antes de configurar la PaymentSheet
      setupPayment();
    }
  }, [payableAmount]); // Observa los cambios en payableAmount

  // Estados para mostrar características y detalles del producto
  const [showCaracteristicas, setShowCaracteristicas] = useState(false);
  const [showCategoria, setShowCategoria] = useState(false);
  const [showIncluye, setShowIncluye] = useState(false);

  const fetchProductoInfo = async () => {
    if (idProducto) {
      const producto = await ApiService.getInstance().fetchData(`Producto/${idProducto}`);
      setProductoInfo(producto);

      // Multiplica el precio por 100 para que Stripe lo interprete correctamente en centavos
      const amount = producto.Precio * 100;
      setPayableAmount(amount);

      checkIfFavorite(idProducto);
    }
  };

  useEffect(() => {
    fetchProductoInfo();
    fetchRecomendaciones();
  }, [idProducto]);

  const checkIfFavorite = async (productId) => {
    const userId = await AsyncStorage.getItem('id');
    const favoritosData = await ApiService.getInstance().fetchData(`favoritos/${userId}`);
    const isFav = favoritosData?.productos?.some((producto) => producto._id === productId);
    setIsFavorite(isFav);
  };

  const toggleFavorite = async () => {
    const userId = await AsyncStorage.getItem('id');
    try {
      if (isFavorite) {
        await ApiService.getInstance().fetchData('favoritos/eliminar', {
          method: 'POST',
          body: JSON.stringify({ userId, productoId: idProducto }),
        });
        setIsFavorite(false);
        showMessage({
          message: "Eliminado de Favoritos",
          description: "El producto fue eliminado de tus favoritos.",
          type: "warning",
        });
      } else {
        await ApiService.getInstance().fetchData('favoritos/agregar', {
          method: 'POST',
          body: JSON.stringify({ userId, productoId: idProducto }),
        });
        setIsFavorite(true);
        showMessage({
          message: "Agregado a Favoritos",
          description: "El producto fue agregado a tus favoritos.",
          type: "success",
        });
      }
    } catch (error) {
      console.error('Error al cambiar estado de favoritos:', error);
      showMessage({
        message: "Error",
        description: "No se pudo cambiar el estado de favoritos.",
        type: "danger",
      });
    }
  };

  // Función para manejar la actualización de la página
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProductoInfo();
    setRefreshing(false);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: 'black',
          headerBackTitle: 'Atrás',
          headerTitle: productoInfo?.NameProducto || 'Cargando...',
        }}
      />

      {productoInfo === null ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3ba4f6" />
        </View>
      ) : (
        <ScrollView
          className="p-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Contenedor para la imagen y el ícono de favoritos */}
          <View className="relative items-center mb-4">
            <Image
              source={{ uri: productoInfo.Imagen }}
              className="w-full h-72 rounded-lg"
              style={{ resizeMode: 'contain' }}
            />
            <StyledPressable
              onPress={toggleFavorite}
              className="absolute top-2 right-2 p-2 rounded-full active:scale-125"
              style={{
                backgroundColor: isFavorite ? "#3BA4F6" : "rgba(255, 255, 255, 0.6)",
              }}
            >
              <HeartIcon
                color={isFavorite ? "#BFE6FE" : "#3BA4F6"}
                filled={isFavorite}
              />
            </StyledPressable>
          </View>

          {/* Nombre y precio del producto */}
          <View className="mb-4 flex-row justify-between items-center">
            <Textito className="text-2xl font-bold text-[#223263] mb-2">
              {productoInfo.NameProducto}
            </Textito>
          </View>

          {/* Precio */}
          <View className="mb-4">
            <Textito className="text-2xl text-[#3ba4f6] font-bold mb-2">
              ${productoInfo.Precio.toFixed(2)}
            </Textito>
          </View>

          {/* Existencias */}
          <View className="mb-4">
            <Textito className="text-lg text-[#3ba4f6] font-bold mb-2">
              <Textito className="text-lg text-[#223263] font-bold">Cantidad: </Textito>
              <Textito
                className={`text-lg font-bold ${productoInfo.Existencias < 10 ? 'text-red-500' : 'text-green-500'
                  }`}
              >
                {productoInfo.Existencias} disponibles
              </Textito>
            </Textito>
          </View>

          {/* Descripción */}
          <View className="mb-4">
            <Textito className="text-lg font-bold text-[#223263] mb-1">Descripción</Textito>
            <Textito className="text-base text-[#223263]/70">
              {productoInfo.Descripcion}
            </Textito>
          </View>

          <View className="p-4 bg-white">
            {/* Características del producto */}
            <AnimatedSection
              title="Características"
              content={`- ${productoInfo.Caracteristicas || "Información no disponible"}`}
              expanded={showCaracteristicas}
              toggleExpanded={() => setShowCaracteristicas(!showCaracteristicas)}
            />

            {/* Sección de categoría */}
            <AnimatedSection
              title="Categoría"
              content={productoInfo.Categoria || "Sin categoría"}
              expanded={showCategoria}
              toggleExpanded={() => setShowCategoria(!showCategoria)}
            />

            {/* ¿Qué incluye? */}
            <AnimatedSection
              title="¿Qué incluye?"
              content={productoInfo.Incluye || "Detalles no especificados"}
              expanded={showIncluye}
              toggleExpanded={() => setShowIncluye(!showIncluye)}
            />
          </View>

          {/* Recomendaciones */}
          <View className="mb-4">
            <Textito className="text-lg font-bold text-[#223263] my-2">También puede interesarte</Textito>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recomendaciones.map((relacionado, index) => (
                <StyledPressable
                  key={index}
                  onPress={() => {
                    // Navega a la vista de detalles del producto relacionado
                    router.push(`producto/${relacionado._id}`);
                  }}
                  className="w-40 bg-white border border-gray-200 rounded-lg shadow-sm m-2 p-2"
                >
                  <Image
                    source={{ uri: relacionado.Imagen }}
                    className="w-full h-24 rounded-md mb-2"
                    style={{ resizeMode: 'contain' }}
                  />
                  <Textito className="text-sm font-bold text-[#223263]">{relacionado.NameProducto}</Textito>
                  <Textito className="text-lg text-[#3ba4f6] font-semibold">${relacionado.Precio.toFixed(2)}</Textito>
                </StyledPressable>
              ))}
            </ScrollView>
          </View>

          {/* Botón de pagar con Stripe*/}
          <StyledPressable
            className="bg-[#3ba4f6] py-4 rounded-lg items-center mb-4 active:opacity-50 active:scale-95"
            onPress={openPaymentSheet}
            disabled={!isPaymentSheetReady}
          >
            <Textito className="text-white text-lg font-bold">Comprar ahora</Textito>
          </StyledPressable>

          {/* Botón para agregar al carrito*/}
          <StyledPressable
            className="bg-[#4db4b2] py-4 rounded-lg items-center mb-10 active:opacity-50 active:scale-95 flex-row justify-center"
            onPress={handleAddToCart}
          >
            <Textito className="text-white text-lg font-bold">Agregar al carrito</Textito>
          </StyledPressable>
        </ScrollView>
      )}
    </View>
  );
};

export default DetalleProducto;

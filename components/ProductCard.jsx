// ProductCard.jsx
import React from 'react';
import { View, Animated, Pressable, Image } from 'react-native';
import { styled } from 'nativewind';
import Textito from './Textito';

const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);

const ProductCard = ({ image, name, price, onPress }) => {
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleValue }],
                marginHorizontal: 12,
                marginTop: 20,
                borderRadius: 10,
                borderColor: '#EBF0FF',
                borderWidth: 1,
                overflow: 'hidden',
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
                backgroundColor: 'white',
            }}
        >
            <StyledPressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                className="flex-column items-center"
            >
                <View className="w-44 h-72 items-center">
                    <View className="w-full h-2/4">
                        <StyledImage source={{ uri: image }} className="w-full h-full" style={{ resizeMode: 'contain' }} />
                    </View>
                    <View className="my-auto w-full px-2">
                        <Textito className="text-base text-[#223263] m-2" fontFamily="PoppinsBold">
                            {name}
                        </Textito>
                        <Textito className="text-lg text-[#3ba4f6] mx-2" fontFamily="PoppinsBold">
                            ${price}
                        </Textito>
                    </View>
                </View>
            </StyledPressable>
        </Animated.View>
    );
};

export default ProductCard;

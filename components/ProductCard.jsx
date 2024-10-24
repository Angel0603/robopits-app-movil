import { View, Text, Pressable, Image } from 'react-native'
import { styled } from 'nativewind';
import Textito from './Textito';

const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);


const ProductCard = ({ image, name, price }) => {
    return (
        <StyledPressable className="flex-column active:opacity-50">
            <View className="w-44 h-72 mx-3 mt-5 rounded-md items-center border-[#EBF0FF] border">
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
    );
};

export default ProductCard
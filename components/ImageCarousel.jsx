import React, { useState, useRef } from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledImage = styled(Image);

const { width } = Dimensions.get('window');  // Obtener el ancho completo de la pantalla

const data = [
  { id: '1', imageUri: require('../assets/img1.jpg') },
  { id: '2', imageUri: require('../assets/img2.jpg') },
  { id: '3', imageUri: require('../assets/img3.jpg') }
];

const PaginationDot = ({ isActive }) => (
  <StyledView className={`h-2 w-2 rounded-full mx-1 ${isActive ? 'bg-[#3BA4F6]' : 'bg-gray-200/60'}`} />
);

const CarouselItem = ({ item }) => (
  <View style={{ width: width}}>
  <StyledView className="flex items-center justify-center mx-5 bg-transparent" style={{ width: width - 40, height: 200, borderColor: 'black', borderWidth: 2, borderRadius: 8 }}>
    <StyledImage source={item.imageUri} style={{ width: '100%', height: '100%', resizeMode: 'fix' }} /> 
  </StyledView>
  </View>
);

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();

  const onViewRef = useRef(({ changed }) => {
    if (changed && changed.length > 0) {
      setCurrentIndex(changed[0].index);
    }
  });

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50
  });

  return (
    <StyledView className="py-5">
      <FlatList
        ref={ref}
        data={data}
        renderItem={CarouselItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewabilityConfig.current}
      />
      <StyledView className="flex-row justify-center mt-2.5">
        {data.map((_, i) => (
          <PaginationDot key={i} isActive={i === currentIndex} />
        ))}
      </StyledView>
    </StyledView>
  );
};

export default ImageCarousel;

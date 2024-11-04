import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, Animated } from 'react-native';
import { styled } from 'nativewind';
import ApiService from '../lib/ApiService.js';
import SkeletonImage from './SkeletonImage';

const StyledView = styled(View);
const StyledImage = styled(Image);

const { width } = Dimensions.get('window');

const CarouselItem = ({ item }) => (
  <View style={{ width: width }}>
    <StyledView className="flex items-center justify-center mx-5 bg-transparent" style={{ width: width - 40, height: 230, borderColor: 'white', borderWidth: 2, borderRadius: 8 }}>
      <StyledImage source={{ uri: item.Imagen }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
    </StyledView>
  </View>
);

const Pagination = ({ currentIndex, totalImages }) => {
  const dots = [];
  const step = Math.ceil(totalImages / 5);

  const dotPosition = currentIndex / step;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isActive = i === Math.floor(dotPosition);
        return (
          <Animated.View key={i} style={{
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: isActive ? '#3BA4F6' : '#CCCCCC',
            marginHorizontal: 4,
            transform: [{ scale: isActive ? 1.5 : 1 }]
          }} />
        );
      })}
    </View>
  );
};

const ImageCarousel = () => {
  const [imagenes, setImagenes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getInstance().fetchData('Productos');
        setImagenes(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (imagenes.length > 0) {
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % imagenes.length;
        setCurrentIndex(nextIndex);
        ref.current.scrollToIndex({ index: nextIndex, animated: true });
      }, 3000);

      return () => clearInterval(intervalRef.current);
    }
  }, [currentIndex, imagenes.length]);

  return (
    <StyledView className="py-5">
      {imagenes.length === 0 ? (
        <SkeletonImage />
      ) : (
        <>
          <FlatList
            ref={ref}
            data={imagenes}
            renderItem={CarouselItem}
            keyExtractor={item => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                ref.current.scrollToIndex({ index: info.index, animated: true });
              });
            }}
            onViewableItemsChanged={({ viewableItems }) => {
              if (viewableItems.length > 0) {
                setCurrentIndex(viewableItems[0].index);
              }
            }}
          />
          <Pagination currentIndex={currentIndex} totalImages={imagenes.length} />
        </>
      )}
    </StyledView>
  );
};

export default ImageCarousel;

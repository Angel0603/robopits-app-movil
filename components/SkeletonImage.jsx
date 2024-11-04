import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const SkeletonImage = () => {
  return (
    <StyledView className="flex items-center justify-center w-full h-56 bg-[#eff9ff]">
      <StyledView className="w-10 h-10 border-4 border-t-[#3ba4f6] border-gray-300 rounded-full animate-spin" />
    </StyledView>
  );
};

export default SkeletonImage;

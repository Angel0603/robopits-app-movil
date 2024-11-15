import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const LoadingSpinner = () => {
  return (
    <StyledView className="flex-1 items-center justify-center bg-gray-100">
      <StyledView className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></StyledView>
    </StyledView>
  );
};

export default LoadingSpinner;

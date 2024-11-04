import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

const SkeletonLoader = () => {
  return (
    <StyledView className="w-44 h-72 mx-3 mt-5 rounded-md border border-gray-200 p-4 bg-white">
      {/* Placeholder for image */}
      <StyledView className="w-full h-32 bg-gray-200 rounded-md animate-pulse" />

      {/* Placeholder for text */}
      <StyledView className="mt-4 space-y-2">
        <StyledView className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <StyledView className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
      </StyledView>

      {/* Placeholder for rating */}
      <StyledView className="flex-row items-center justify-between mt-4">
        <StyledView className="flex-row space-x-1">
          {[...Array(5)].map((_, index) => (
            <StyledView key={index} className="w-3 h-3 bg-yellow-400 rounded-full" />
          ))}
        </StyledView>
        <StyledView className="w-6 h-4 bg-gray-200 rounded animate-pulse" />
      </StyledView>
    </StyledView>
  );
};

export default SkeletonLoader;

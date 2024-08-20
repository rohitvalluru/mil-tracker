import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const ButtonComponent = ({ title, onPress, className }) => {
  return (
    <TouchableOpacity className={`flex flex-row justify-center items-center h-14 w-36 rounded-xl ${className}`} onPress={onPress}>
      <Text className="text-white text-base font-semibold mr-2 bg-center bg-cover">{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

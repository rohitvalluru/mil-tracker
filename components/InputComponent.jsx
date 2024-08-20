import React, {useState} from 'react';
import { View, TextInput } from 'react-native';

const InputComponent = ({ placeholder, keyboardType = 'default', value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="m-5">
      <TextInput
        className={`h-12 w-80 border ${isFocused ? 'border-blue-600' : 'border-gray-400'} rounded-md px-3 mb-2 text-base mt-5`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{ fontWeight: 'bold' }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default InputComponent;

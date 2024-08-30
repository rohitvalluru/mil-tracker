import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import useStore from '../store/store';

const CircularImagePicker = () => {
  const { setImageUri } = useStore();  // Get setImageUri from the global store
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update global state
      setImageUri(result.assets[0].uri);  // Update parent component's state

    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <View className="h-40 w-40 rounded-full mt-10 bg-slate-400 justify-center items-center overflow-hidden">
      {image ? (
          <Image source={{ uri: image }} className="w-full h-full" />
        ) : (
          <FontAwesome name="photo" size={28} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CircularImagePicker;

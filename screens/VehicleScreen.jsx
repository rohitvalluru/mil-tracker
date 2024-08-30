import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';

const VehicleScreen = () => {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']} className="h-screen w-screen"
      >
        <Text>HomeScreen</Text>
        <Card/>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default VehicleScreen
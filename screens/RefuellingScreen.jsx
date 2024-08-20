import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const RefuellingScreen = () => {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']} className="h-screen w-screen"
      >
        <Text>HomeScreen</Text>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default RefuellingScreen
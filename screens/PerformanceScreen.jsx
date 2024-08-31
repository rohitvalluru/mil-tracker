import { View, Text,  } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import useStore from '../store/store';
import ModalComponent from '../components/ModalComponent';

const PerformanceScreen = () => {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']} className="h-screen w-screen"
      >
      {/* <ModalComponent/> */}
      </LinearGradient>
    </SafeAreaView>
  ) 
}

export default PerformanceScreen
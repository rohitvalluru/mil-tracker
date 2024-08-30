import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useRef, useEffect } from 'react'
import LottieView from 'lottie-react-native'
import useStore from '../store/store'
import { FontAwesome } from '@expo/vector-icons'

const VehicleAddedScreen = () => {
    const confettiRef = useRef(null);
    const { imageUri, vehicleName } = useStore();

    useEffect(() => {
        // Play the confetti animation when the component mounts
        if (confettiRef.current) {
            confettiRef.current.play();
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <View style={styles.container}>
        <View className="h-48 w-48 rounded-full bg-slate-400 justify-center items-center overflow-hidden -mt-40">      
          <Image source={{ uri: imageUri }} className="w-full h-full" />       
      </View>
      <View className="justify-center items-center mt-10">
        <Text className="text-sky-900 text-xl font-bold">{vehicleName}</Text>
        <Text className='text-sky-900 text-3xl font-semibold mt-10'>Vehicle Added!</Text>
      </View>
            <LottieView
                source={require('../assets/confetti.json')}
                ref={confettiRef}
                style={styles.lottie}
                loop={false}
                resizeMode='cover'
                autoPlay={false} // Set to false so we can control when it plays
            />
        </View>
    )
}

export default VehicleAddedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1000,
        pointerEvents: 'none',
    }
})
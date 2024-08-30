import { View, Text, Image } from 'react-native'
import React from 'react'

const Card = () => {
  return (
    <View className="justify-center items-center mt-10">
          <View className="bg-gray-200 h-52 w-80 rounded-xl bg-cover">
            <Image source={require('../assets/road.jpg')} className='h-40 w-80'/>
          <View className="flex flex-row gap-28 justify-center items-center">
            <View>
              <Text className="text-sky-900 font-semibold text-lg">Yamaha R15</Text>
              <Text className="text-gray-500 font-semibold">2 wheeler</Text>
            </View>
            <Text className="text-sky-900 font-semibold text-base">155 CC</Text>
          </View>
          </View>
        </View>
  )
}

export default Card
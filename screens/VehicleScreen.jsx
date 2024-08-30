import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';
import useStore from '../store/store';

const VehicleScreen = () => {
  const {vehicles} = useStore();

  const renderItem = ({item})=>(
    <Card
      vehicleName={item.vehicleName}
      engineCC={item.engineCC}
      vehicleType={item.vehicleType}
      imageUri={item.imageUri}
    />
  )
  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']} className="h-screen w-screen"
      >
        <Text>HomeScreen</Text>
        <FlatList
          data={vehicles}
          renderItem={renderItem}
          keyExtractor={(item, index)=> index.toString()}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

export default VehicleScreen
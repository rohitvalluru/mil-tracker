import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';
import useStore from '../store/store';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import NoVehicleComponent from '../components/NoVehicleComponent';

const VehicleScreen = () => {
  const { vehicles } = useStore();
  const navigation = useNavigation();

  const handleAddVehicleHome = () => {
    navigation.navigate('AddVehicle');
  };

  const renderItem = ({ item }) => (
    <Card
      vehicleName={item.vehicleName}
      engineCC={item.engineCC}
      vehicleType={item.vehicleType}
      imageUri={item.imageUri}
    />
  );

  const renderFooter = () => (
    <View className="items-center p-4">
      <TouchableOpacity
        className="flex flex-row justify-center items-center h-12 w-36 bg-sky-900 rounded-xl"
        onPress={handleAddVehicleHome}
      >
        <Text className="text-white text-base font-semibold mr-2">
          Add Vehicle
        </Text>
        <AntDesign name="arrowright" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']}
        className="flex-1"
      >
        <View className="flex-1">
          <Text className="text-2xl font-bold m-4 text-center text-white">Vehicles</Text>
          {vehicles.length > 0 ? (
            <FlatList
              data={vehicles}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={renderFooter}
              contentContainerStyle={{ flexGrow: 1 }} // Ensures content container takes full height
            />
          ) : (
            <NoVehicleComponent />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default VehicleScreen;

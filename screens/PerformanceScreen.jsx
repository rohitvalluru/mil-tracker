import { View, Text, Button, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import useStore from '../store/store';
import BarChartComponent from '../components/BarChartComponent';
import MileageModal from '../components/MileageModal';

const PerformanceScreen = () => {
  const { vehicles, addFuelData } = useStore(); // Assuming `addFuelData` action is implemented
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSaveFuelData = (data) => {
    addFuelData(data); // Save data to the store
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']} className="h-screen w-screen"
      >
      <BarChartComponent/>
      <View className="flex-1 justify-center items-center">
      
      <TouchableOpacity
            className="flex flex-row justify-center items-center h-14 w-40 bg-sky-900 mt-10 rounded-xl"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white text-base font-semibold mr-2">
              Add Mileage
            </Text>
          </TouchableOpacity>
        <MileageModal
          visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveFuelData}
        selectedVehicle={selectedVehicle}
        />
      </View>
      </LinearGradient>
    </SafeAreaView>
  ) 
}

export default PerformanceScreen
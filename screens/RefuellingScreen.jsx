import { View, Text, Image, TouchableOpacity, Button, ScrollView, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NoVehicleComponent from '../components/NoVehicleComponent';
import { LinearGradient } from 'expo-linear-gradient';
import ModalComponent from '../components/ModalComponent';
import FuelDataList from '../components/FuelDataList';
import useStore from '../store/store';


const RefuellingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { refuelRecords } = useStore();
  const { clearRefuelRecords } = useStore();

  const handleClearRecords = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete all Fuel Records?",
      [
        { text: "Cancel" },
        { text: "OK", onPress: () => clearRefuelRecords() }
      ]
    );
  };

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toDateString();
    }
    return 'Unknown Date';
  };
  
  return (
    <SafeAreaView>
    <ScrollView>
      <LinearGradient
        colors={['#83a4d4', '#FFFDE4']} className="h-screen w-screen"
      >
      <View className="justify-center items-center">
        <TouchableOpacity
                className="flex flex-row justify-center items-center h-14 w-40 bg-sky-900 mt-10 rounded-xl"
                onPress={() => setModalVisible(true)}
              >
                <Text className="text-white text-base font-semibold mr-2">
                  Add Refuelling
                </Text>
        </TouchableOpacity>
        {refuelRecords.map((record, index) => (
        <FuelDataList
          key={index}
          date={formatDate(record.refuelDate)}
          liters={record.liters}
          price={record.moneySpent}
        />
      ))}
        <ModalComponent
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <TouchableOpacity className="flex flex-row justify-center items-center h-10 w-36 bg-red-600 mt-10 rounded-lg" onPress={handleClearRecords}>
      <Text className="text-white text-base font-semibold mr-2">
        Clear Records
      </Text>
      </TouchableOpacity>
      </View>

      </LinearGradient>
    </ScrollView>
    </SafeAreaView>
  )
}

export default RefuellingScreen
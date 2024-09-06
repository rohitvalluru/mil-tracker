import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import useStore from "../store/store";

const FuelInsights = ({ selectedVehicle }) => {
  const { refuelRecords } = useStore();
  const [avgFuelConsumption, setAvgFuelConsumption] = useState("0 km/l");
  const [lastFuelConsumption, setLastFuelConsumption] = useState("0 km/l");

  useEffect(() => {
    if (!selectedVehicle) {
      return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const records = refuelRecords[selectedVehicle.vehicleName] || [];

    // Filter records for the current month
    const monthlyRecords = records.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === currentYear &&
        recordDate.getMonth() === currentMonth
      );
    });

    // Sort by date to get the most recent record
    monthlyRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (monthlyRecords.length > 0) {
      const latestRecord = monthlyRecords[0]; // Get the record closest to the current date

      // Calculate mileage
      const distance = parseFloat(latestRecord.distance) || 0;
      const fuelUsed = parseFloat(latestRecord.fuelUsed) || 0;
      const mileage = fuelUsed > 0 ? (distance / fuelUsed).toFixed(2) : "0";
      setLastFuelConsumption(`${mileage} km/l`);
    } else {
      setLastFuelConsumption("N/A");
    }

    // Calculate average fuel consumption for the month
    const totalDistance = monthlyRecords.reduce(
      (sum, record) => sum + (parseFloat(record.distance) || 0),
      0
    );
    const totalFuelUsed = monthlyRecords.reduce(
      (sum, record) => sum + (parseFloat(record.fuelUsed) || 0),
      0
    );

    if (totalFuelUsed > 0) {
      const avgConsumption = (totalDistance / totalFuelUsed).toFixed(2);
      setAvgFuelConsumption(`${avgConsumption} km/l`);
    } else {
      setAvgFuelConsumption("N/A");
    }
  }, [selectedVehicle, refuelRecords]);

  return (
    <View className="justify-center items-center mt-5 w-full">
      <Text className="text-lg font-bold text-sky-800">Fuel Insights</Text>
      <View className="h-36 rounded-xl">
        <View className="flex flex-row justify-center items-center">
          <View className="bg-white rounded-xl justify-center items-center m-2 h-32 w-36">
            <Text className="font-bold text-sky-900 text-base">
              Avg Fuel Consumption
            </Text>
            <Text className="font-medium text-green-600 text-2xl mt-3">
              {avgFuelConsumption}
            </Text>
          </View>
          <View className="bg-white rounded-xl justify-center items-center m-2 h-32 w-36">
            <Text className="font-bold text-sky-900 text-base">
              Last Fuel Consumption
            </Text>
            <Text className="font-medium text-red-500 text-2xl mt-3">
              {lastFuelConsumption}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FuelInsights;

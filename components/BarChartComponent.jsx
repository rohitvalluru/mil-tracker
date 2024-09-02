import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import useStore from '../store/store';
import DropdownComponent from '../components/DropdownComponent';

const App = () => {
  const { vehicles, refuelRecords } = useStore();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const calculateMonthlySpending = () => {
      if (!selectedVehicle) return;

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const monthlyData = Array(5).fill(0);
      const monthLabels = Array(5).fill('').map((_, index) => {
        const date = new Date(currentYear, currentMonth - (4 - index), 1);
        return date.toLocaleString('default', { month: 'short' });
      });

      const records = refuelRecords[selectedVehicle.vehicleId] || [];

      records.forEach(record => {
        const recordDate = new Date(record.refuelDate);
        const monthDiff = (currentYear - recordDate.getFullYear()) * 12 + currentMonth - recordDate.getMonth();

        if (monthDiff >= 0 && monthDiff < 5) {
          monthlyData[4 - monthDiff] += parseFloat(record.moneySpent);
        }
      });

      const formattedData = monthlyData.map((value, index) => ({
        value,
        label: monthLabels[index],
        frontColor: "#FFA500",
      }));

      setBarData(formattedData);
    };

    calculateMonthlySpending();
  }, [selectedVehicle, refuelRecords]);

  const handleVehicleSelection = (vehicleName) => {
    const vehicle = vehicles.find(v => v.vehicleName === vehicleName);
    setSelectedVehicle(vehicle);
  };

  const roundToNearestHundred = (num) => {
    return Math.ceil(num / 100) * 100;
  };

  return (
    <View style={styles.container}>
      <DropdownComponent 
        useLocalStorage={true} 
        onChangeValue={handleVehicleSelection} 
        placeholder="Choose Vehicle"
      />
      {selectedVehicle ? (
        <View style={styles.chartContainer}>
          <Text style={styles.title}>Monthly Fuel Spending</Text>
          <View style={styles.barChartContainer}>
            <BarChart
              showFractionalValue
              noOfSections={4}
              maxValue={roundToNearestHundred(Math.max(...barData.map(data => data.value)))}
              data={barData}
              isAnimated
              width={300}
              height={130}
              barWidth={25}
              barBorderRadius={5}
              xAxisLength={275}
              xAxisThickness={0}
              hideRules={true}
            />
          </View>
        </View>
      ) : (
        <Text style={styles.selectVehicleText}>Please select a vehicle to view fuel records</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  barChartContainer: {
    backgroundColor: 'white',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  selectVehicleText: {
    textAlign: 'center',
    color: '#888',
  },
});

export default App;

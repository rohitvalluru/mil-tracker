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

      // console.log("Selected Vehicle:", selectedVehicle);
      // console.log("Refuel Records:", refuelRecords);

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const monthlyData = Array(5).fill(0);
      const monthLabels = Array(5).fill('').map((_, index) => {
        const date = new Date(currentYear, currentMonth - (4 - index), 1);
        return date.toLocaleString('default', { month: 'short' });
      });

      // console.log("Month Labels:", monthLabels);

      // Use vehicleName instead of vehicleId
      const records = refuelRecords[selectedVehicle.vehicleName] || [];
      // console.log("Records for selected vehicle:", records);

      records.forEach(record => {
        const recordDate = new Date(record.refuelDate);
        // console.log("Processing record:", record);
        // console.log("Record date:", recordDate);

        const monthDiff = (currentYear - recordDate.getFullYear()) * 12 + currentMonth - recordDate.getMonth();
        // console.log("Month difference:", monthDiff);

        if (monthDiff >= 0 && monthDiff < 5) {
          // console.log(`Adding ${record.moneySpent} to month index ${4 - monthDiff}`);
          monthlyData[4 - monthDiff] += parseFloat(record.moneySpent);
        }
      });

      // console.log("Monthly Data:", monthlyData);

      const formattedData = monthlyData.map((value, index) => ({
        value,
        label: monthLabels[index],
        frontColor: "#FFA500",
      }));

      // console.log("Formatted bar data:", formattedData);
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
    <View style={styles.container} >
      <DropdownComponent 
        useLocalStorage={true} 
        onChangeValue={handleVehicleSelection} 
        placeholder="Choose Vehicle"
      />
      {selectedVehicle ? (
        barData.length > 0 ? (
          <View style={styles.chartContainer}>
            <Text className="text-center text-sky-900 font-semibold text-lg">Monthly Fuel Spending</Text>
            <View className="bg-white h-48 justify-center items-center rounded-2xl p-3 mt-5">
            <BarChart
              showFractionalValue
              noOfSections={4}
              maxValue={roundToNearestHundred(Math.max(...barData.map(data => data.value)))}
              data={barData}
              isAnimated
              width={300}
              height={130}
              barWidth={25} // Adjust the bar width if needed
              barBorderRadius={5} // Set the border radius to make the bars rounded
              xAxisLength={275}
              xAxisThickness={0} // This hides the x-axis line
              hideRules={true}
            />
            </View>
          </View>
        ) : (
          <Text style={styles.noDataText}>No data available for this vehicle</Text>
        )
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
    height: 50,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  
  noDataText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
  },
  selectVehicleText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
  },
});

export default App;
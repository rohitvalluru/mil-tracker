import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import useStore from "../store/store";
import DropdownComponent from "../components/DropdownComponent";

const App = () => {
  const { vehicles, refuelRecords, selectedVehicle, currentUser } = useStore();
  const [barData, setBarData] = useState([]);
  const [mileageData, setMileageData] = useState([]);

  useEffect(() => {
    const calculateMonthlySpending = () => {
      if (!selectedVehicle) return;

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const monthlyData = Array(5).fill(0);
      const monthLabels = Array(5)
        .fill("")
        .map((_, index) => {
          const date = new Date(currentYear, currentMonth - (4 - index), 1);
          return date.toLocaleString("default", { month: "short" });
        });

      const records = refuelRecords[selectedVehicle.vehicleName] || [];

      records.forEach((record) => {
        const recordDate = new Date(record.refuelDate);
        const monthDiff =
          (currentYear - recordDate.getFullYear()) * 12 +
          currentMonth -
          recordDate.getMonth();

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


  useEffect(() => {
    const calculateMonthlyMileage = () => {
      if (!selectedVehicle || !currentUser) return;

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const monthlyMileageSum = Array(5).fill(0);
      const monthlyMileageCount = Array(5).fill(0);
      const monthLabels = Array(5)
        .fill("")
        .map((_, index) => {
          const date = new Date(currentYear, currentMonth - (4 - index), 1);
          return date.toLocaleString("default", { month: "short" });
        });

      const records =
        refuelRecords[currentUser.email]?.[selectedVehicle.vehicleName] || [];

      records.forEach((record) => {
        const recordDate = new Date(record.date);
        const monthDiff =
          (currentYear - recordDate.getFullYear()) * 12 +
          currentMonth -
          recordDate.getMonth();

        if (monthDiff >= 0 && monthDiff < 5 && record.fuelUsed > 0) {
          const mileage =
            parseFloat(record.distance) / parseFloat(record.fuelUsed);
          monthlyMileageSum[4 - monthDiff] += mileage;
          monthlyMileageCount[4 - monthDiff] += 1;
        }
      });

      const formattedMileageData = monthlyMileageSum.map((sum, index) => ({
        value:
          monthlyMileageCount[index] > 0 ? sum / monthlyMileageCount[index] : 0,
        label: monthLabels[index],
        frontColor: "#FFA500",
      }));
      // console.log("refuel records: ", refuelRecords);

      setMileageData(formattedMileageData);
    };

    calculateMonthlyMileage();
  }, [selectedVehicle, refuelRecords, currentUser]);

  const handleVehicleSelection = (vehicleName) => {
    const vehicle = vehicles.find((v) => v.vehicleName === vehicleName);
    setSelectedVehicle(vehicle);
  };

  const roundToNearestHundred = (num) => {
    return Math.ceil(num / 100) * 100;
  };

  const roundToNearestTen = (num) => {
    return Math.ceil(num / 10) * 10;
  };

  const renderChart = (data, title, maxValueFunc, isMileageChart = false) => {
    
    if (data.length === 0 || data.every((item) => item.value === 0)) {
      return <Text className="text-transparent">No data available</Text>;
    }

    return (
      <View style={styles.chartContainer}>
        <Text className="text-center text-sky-900 font-semibold text-lg">
          {title}
        </Text>
        <View className="bg-white h-48 justify-center items-center rounded-2xl p-3 mt-5">
          <BarChart
            showFractionalValue
            noOfSections={4}
            maxValue={maxValueFunc(Math.max(...data.map((item) => item.value)))}
            data={data}
            isAnimated
            width={300}
            height={130}
            barWidth={25}
            barBorderRadius={5}
            xAxisLength={275}
            xAxisThickness={0}
            hideRules={true}
            showLine={isMileageChart}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderChart(barData, "Monthly Fuel Spending", roundToNearestHundred)}
      {renderChart(
        mileageData,
        "Vehicle Mileage Performance",
        roundToNearestTen,
        true
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 50,
    fontSize: 18, // Use points, not pixels
    lineHeight: 28, // Use points, not pixels
  },
  chartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  noDataText: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
  selectVehicleText: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
});

export default App;

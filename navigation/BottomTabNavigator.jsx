import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PerformanceScreen from "../screens/PerformanceScreen";
import RefuellingScreen from "../screens/RefuellingScreen";
import VehicleScreen from "../screens/VehicleScreen";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HomeStackScreen from "./StackNavigation";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ setIsAuthenticated }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            return (
              <Entypo
                name="home"
                size={28}
                color={focused ? "red" : "black"}
              />
            );
          } else if (route.name === "Refuelling") {
            return (
              <MaterialCommunityIcons
                name="fuel"
                size={28}
                color={focused ? "red" : "black"}
              />
            );
          } else if (route.name === "Performance") {
            return (
              <Ionicons
                name="stats-chart"
                size={28}
                color={focused ? "red" : "black"}
              />
            );
          } else if (route.name === "Vehicles") {
            return (
              <Ionicons
                name="car-sport-sharp"
                size={28}
                color={focused ? "red" : "black"}
              />
            );
          }
        },
        tabBarActiveTintColor: "red", // For the label color when the tab is selected
        tabBarInactiveTintColor: "black", // For the label color when the tab is not selected
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeStackScreen setIsAuthenticated={setIsAuthenticated} />}
      </Tab.Screen>
      <Tab.Screen name="Refuelling" component={RefuellingScreen} />
      <Tab.Screen name="Performance" component={PerformanceScreen} />
      <Tab.Screen name="Vehicles" component={VehicleScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

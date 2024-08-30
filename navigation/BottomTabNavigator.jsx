import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PerformanceScreen from '../screens/PerformanceScreen';
import RefuellingScreen from '../screens/RefuellingScreen';
import VehicleScreen from '../screens/VehicleScreen';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HomeStackScreen from './StackNavigation';


const Tab = createBottomTabNavigator()

const BottomTabNavigator = ()=> {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={HomeStackScreen} options={{tabBarIcon:({color, size})=>(
        <Entypo name="home" size={28} color="black" />
      )}}/>
      <Tab.Screen name="Refuelling" component={RefuellingScreen} options={{tabBarIcon:({color, size})=>(
        <MaterialCommunityIcons name="fuel" size={28} color="black" />
      )}}/>
      <Tab.Screen name="Performance" component={PerformanceScreen} options={{tabBarIcon:({color, size})=>(
        <Ionicons name="stats-chart" size={28} color="black" />
      )}}/>
      <Tab.Screen name="Vehicles" component={VehicleScreen} options={{tabBarIcon:({color, size})=>(
        <Ionicons name="car-sport-sharp" size={28} color="black" />
      )}}/>
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
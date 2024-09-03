import React, { useState, useEffect } from 'react';
import { View, } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';


const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, );

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        {isShowSplash ? <SplashScreen /> : <BottomTabNavigator />}
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;

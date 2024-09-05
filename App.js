import React, { useState, useEffect } from "react";
import { View } from "react-native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./screens/SplashScreen";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import useStore from "./store/store";
import AuthStackNavigator from "./navigation/AuthorizationStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [initialRoute, setInitialRoute] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { users, loadUsers } = useStore(); // Access users from Zustand store

  useEffect(() => {
    const checkUserAndNavigate = async () => {
      await loadUsers(); // Load users from AsyncStorage
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay (e.g., SplashScreen display time)

      const loadedUsers = useStore.getState().users; // Access updated users state

      console.log(loadedUsers);
      if (loadedUsers.length > 0) {
        setInitialRoute("UserLoginScreen");
      } else {
        setInitialRoute("Signup");
      }

      setIsShowSplash(false);
    };

    checkUserAndNavigate();
  }, [loadUsers]);

  if (isShowSplash) {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <SplashScreen />
      </ApplicationProvider>
    );
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
          ) : (
            <Stack.Screen name="AuthStack">
              {(props) => (
                <AuthStackNavigator
                  {...props}
                  initialRouteName={initialRoute}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;

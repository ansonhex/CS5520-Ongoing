import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import { Button, Alert } from "react-native";

const Stack = createNativeStackNavigator();

const screenStyleOptions = {
  headerStyle: {
    backgroundColor: "#ccc",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenStyleOptions}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "My Goals",
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import { Button, Alert } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "My Goals",
            headerStyle: {
              backgroundColor: "#ccc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route, navigation }) => ({
            title: route.params?.goal?.text || "Goal Details",
            headerStyle: {
              backgroundColor: "#ccc",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },

            // right
            headerRight: () => (
              <Button
                onPress={() => console.log("This is a warning!")}
                title="Warning"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

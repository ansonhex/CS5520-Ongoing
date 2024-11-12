import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseSetup";
import { TouchableOpacity, Text } from "react-native";
import Map from "./components/Map";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenStyleOptions}>
        {user ? (
          // App Stack
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                title: "All My Goals",
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Profile")}
                  >
                    <Text style={{ color: "#fff", marginRight: 10 }}>
                      Profile
                    </Text>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="Details" component={GoalDetails} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Map" component={Map} />
          </>
        ) : (
          // Auth Stack
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ title: "Signup" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

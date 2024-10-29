import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import GoalDetails from "./components/GoalDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { auth } from "./firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";

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
          // AppStack screens
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "My Goals",
              }}
            />
            <Stack.Screen name="Details" component={GoalDetails} />
          </>
        ) : (
          // AuthStack screens
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

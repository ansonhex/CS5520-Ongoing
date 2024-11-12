import React from "react";
import { View, Button, Alert } from "react-native";
import * as Location from "expo-location";

const LocationManager = () => {
  const locateUserHandler = async () => {
    try {
      const location = await Location.getCurrentPositionAsync();
      Alert.alert(
        "Location",
        `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
      );
    } catch (err) {
      console.error("Failed", err);
      Alert.alert("Failed", "Failed to get location. Please try again.");
    }
  };

  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
    </View>
  );
};

export default LocationManager;

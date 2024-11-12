import React from "react";
import { View, Button, Alert } from "react-native";
import * as Location from "expo-location";

const LocationManager = () => {
  const [response, requestPermission] = Location.useForegroundPermissions();

  const verifyLocation = async () => {
    if (response?.granted) {
      return true;
    }

    const res = await requestPermission();
    return res.granted;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyLocation();
    if (!hasPermission) {
      Alert.alert(
        "Location Permission",
        "Please enable location services for this app."
      );
      return;
    }
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

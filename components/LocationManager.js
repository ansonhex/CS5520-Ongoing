import React, { useState } from "react";
import { View, Button, Alert, Image } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const LocationManager = () => {
  const navigation = useNavigation();
  const mapsApiKey = process.env.EXPO_PUBLIC_mapsApiKey;
  const [location, setLocation] = useState(null);
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
      const locationData = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
      console.log(locationData);
    } catch (err) {
      console.error("Failed", err);
      Alert.alert("Failed", "Failed to get location. Please try again.");
    }
  };

  const mapUrl = location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`
    : null;

  return (
    <View>
      <Button title="Find My Location" onPress={locateUserHandler} />
      {location && (
        <Image
          source={{ uri: mapUrl }}
          style={{ width: 400, height: 200, marginTop: 10 }}
        />
      )}
      <Button
        title="Open Map"
        onPress={() => {
          if (location) {
            navigation.navigate("Map", { location });
          } else {
            Alert.alert(
              "Location not set",
              "Please locate your position first."
            );
          }
        }}
      />
    </View>
  );
};

export default LocationManager;

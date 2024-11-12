import React, { useState, useEffect } from "react";
import { View, Button, Alert, Image } from "react-native";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { saveUserLocation, getUserLocation } from "../firebase/firestoreHelper";
import { auth } from "../firebase/firebaseSetup";

const LocationManager = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mapsApiKey = process.env.EXPO_PUBLIC_mapsApiKey;
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();

  // Verify and request location permission
  const verifyLocation = async () => {
    if (response?.granted) {
      return true;
    }
    const res = await requestPermission();
    return res.granted;
  };

  // Get the user's current location
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
      const userLocation = {
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      };
      setLocation(userLocation);
    } catch (err) {
      console.error("Failed", err);
      Alert.alert("Failed", "Failed to get location. Please try again.");
    }
  };

  // Save location to Firestore
  const saveLocationHandler = async () => {
    if (location) {
      await saveUserLocation(location);
      Alert.alert("Success", "Location saved to Firestore.");
    } else {
      Alert.alert("No Location", "Please find your location first.");
    }
  };

  // Load user location from Firestore
  useEffect(() => {
    const fetchUserLocation = async () => {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (userId) {
        const savedLocation = await getUserLocation(userId);
        if (savedLocation) {
          setLocation(savedLocation);
        }
      }
    };

    fetchUserLocation();
  }, []);

  // Check if a location was selected in Map.js and update the state
  useEffect(() => {
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params?.location]);

  // Navigate to the interactive map screen with the current location
  const openMapHandler = () => {
    if (location) {
      navigation.navigate("Map", { location });
    } else {
      Alert.alert("No Location", "Please find your location first.");
    }
  };

  // Generate Google Static Map URL based on the location
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
      <Button title="Open Map" onPress={openMapHandler} />
      <Button
        title="Save Location to Firestore"
        onPress={saveLocationHandler}
      />
    </View>
  );
};

export default LocationManager;

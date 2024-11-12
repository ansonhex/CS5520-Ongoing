import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = ({ route, navigation }) => {
  const initialLocation = route.params?.location || {
    latitude: 37.78825,
    longitude: -122.4324,
  }; // Default location

  const [selectedLocation, setSelectedLocation] = useState(null);

  // Handle map press to select a location
  const selectLocationHandler = (event) => {
    const coords = event.nativeEvent.coordinate;
    setSelectedLocation(coords);
  };

  // Handle confirm button to navigate back with selected location
  const confirmLocationHandler = () => {
    if (selectedLocation) {
      navigation.navigate("Profile", { location: selectedLocation });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Selected Location" />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Confirm Selected Location"
          onPress={confirmLocationHandler}
          disabled={!selectedLocation} // Disable button if no location is selected
        />
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
});

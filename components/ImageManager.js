import { StyleSheet, Button, View, Alert } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ onCaptureImage }) {
  const takeImageHandler = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      // check not cancelled
      if (!result.cancelled && result.assets && result.assets.length > 0) {
        onCaptureImage(result.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("An Error Occurred", "Please try again", [{ text: "Okay" }]);
    }
  };

  return (
    <View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});

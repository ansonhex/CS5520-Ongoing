import { StyleSheet, Button, View, Alert } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ onCaptureImage }) {
  const [permissionResponse, requestPermission] =
    ImagePicker.useCameraPermissions();

  // verify
  const verifyPermission = async () => {
    if (permissionResponse?.granted) {
      return true;
    }

    const result = await requestPermission();
    return result.granted;
  };

  const takeImageHandler = async () => {
    // check permission
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return;
    }

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

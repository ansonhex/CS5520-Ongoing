import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import ImageManager from "./ImageManager";

export default function Input({ autoFocus, inputData, modal, onCancel }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const handleCaptureImage = (uri) => {
    setImageUri(uri);
  };

  const handleChangeText = (newText) => {
    setText(newText);
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  const handleConfirm = () => {
    inputData({ text, imageUri });
    setText("");
    setImageUri(null);
  };

  // implement Cancel button
  const handleCancel = () => {
    Alert.alert("Confirm Cancel", "Are you sure you want to cancel?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setText(""); // clear the text
          onCancel(); // call onCancel function to close the modal
          setImageUri(null); // clear the image
        },
      },
    ]);
  };

  return (
    <Modal animationType="slide" visible={modal} transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.background}>
          <View style={styles.container}>
            {/* Two images */}
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
                }}
                style={styles.image}
                alt="Network Image: Ticked Logo"
              />
              <Image
                source={require("../assets/download.png")}
                style={styles.image}
                alt="Local Image: Ticked Logo"
              />
            </View>

            <TextInput
              placeholder="Type here!"
              onChangeText={handleChangeText}
              value={text}
              autoCorrect={true}
              style={styles.input}
              autoFocus={autoFocus}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {isFocused && text.length > 0 && <Text>Count: {text.length}</Text>}

            {!isFocused && text.length > 0 && (
              <Text>
                {text.length >= 3
                  ? "Thank you"
                  : "Please type more than 3 characters"}
              </Text>
            )}

            {/* Image */}
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 100, height: 100, margin: 10 }}
              />
            )}

            <ImageManager onCaptureImage={handleCaptureImage} />

            {/* Confirm and Cancel buttons */}
            <View style={styles.buttonContainer}>
              <View style={styles.buttonScheme}>
                <Button
                  title="Cancel"
                  onPress={handleCancel}
                  style={styles.button}
                />
              </View>

              <View style={styles.buttonScheme}>
                <Button
                  title="Confirm"
                  onPress={handleConfirm}
                  style={styles.button}
                  disabled={text.length < 3}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center", // Center the content
  },
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff", // Modal content should have a white background
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "purple",
    padding: 10,
    margin: 10,
    width: "80%",
    borderRadius: 5,
  },
  buttonScheme: {
    backgroundColor: "#FBECDE",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
});

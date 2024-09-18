import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";

export default function Input({ autoFocus, inputData, modal, onCancel }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (newText) => {
    setText(newText);
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  const handleConfirm = () => {
    inputData(text);
    setText("");
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
        },
      },
    ]);
  };

  return (
    <Modal animationType="slide" visible={modal} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <TextInput
            placeholder="Type here!"
            onChangeText={handleChangeText}
            value={text}
            autoCorrect={true}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "purple",
              margin: 10,
            }}
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

          {/* Confirm and Cancel buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={handleCancel}
              style={styles.button}
            />
            <Button
              title="Confirm"
              onPress={handleConfirm}
              style={styles.button}
              disabled={text.length < 3}
            />
          </View>
        </View>
      </View>
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
    // flex: 1,
  },
});

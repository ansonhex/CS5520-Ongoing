import { View, Text, TextInput, Modal, StyleSheet, Button } from "react-native";
import React, { useState } from "react";

export default function Input({ autoFocus, inputData, modal }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (newText) => {
    setText(newText);
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  const handleConfirm = () => {
    // logs users input to console log
    inputData(text);
  };

  return (
    <Modal animationType="slide" visible={modal}>
      <View style={styles.container}>
        <TextInput
          placeholder="Type here!"
          onChangeText={handleChangeText}
          value={text}
          autoCorrect={true}
          style={{ borderBottomWidth: 1, borderBottomColor: "purple" }}
          autoFocus={autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* <Text>Typed text: {text}</Text> */}

        {/* Character count */}
        {isFocused && text.length > 0 && <Text>Count: {text.length}</Text>}

        {/* Message after blur or submit */}
        {!isFocused && (text || "").length > 0 && (
          <Text>
            {text.length >= 3
              ? "Thank you"
              : "Please type more than 3 characters"}
          </Text>
        )}

        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});

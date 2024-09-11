import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

export default function Input({ autoFocus }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (newText) => {
    setText(newText);
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Type here!"
        onChangeText={handleChangeText}
        value={text}
        autoCorrect={false}
        style={{ borderBottomWidth: 1, borderBottomColor: "purple" }}
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <Text>Typed text: {text}</Text>

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
    </View>
  );
}

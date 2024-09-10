import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

export default function Input() {
  const [text, setText] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Type here!"
        onChangeText={(newText) => setText(newText)}
        value={text}
        autoCorrect={false}
        style={{ borderBottomWidth: 1, borderBottomColor: "purple" }}
      />
      <Text>Typed text: {text}</Text>
    </View>
  );
}

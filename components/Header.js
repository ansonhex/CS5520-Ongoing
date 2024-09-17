import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Header({ name }) {
  return (
    <View style={styles.background}>
      <Text style={styles.heading}>Welcome to my {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "purple",
    fontSize: 20,
    margin: 10,
    rounded: 10,
    padding: 10,
  },
  background: {
    borderWidth: 2,
    borderColor: "purple",
    margin: 20,
  }
});

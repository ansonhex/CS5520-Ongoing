import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
    fontSize: windowWidth < 380 ? 20 : 26,
    fontSize: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: windowWidth < 380 ? 10 : 20,
  },
  background: {
    borderWidth: 2,
    borderColor: "purple",
    margin: 20,
    borderRadius: 10,
  },
});

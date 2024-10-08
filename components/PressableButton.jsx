import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const PressableButton = ({
  children,
  onPress,
  style,
  ripple,
  pressedStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={ripple}
      style={({ pressed }) => [style, pressed && pressedStyle]}
    >
      <View>{children}</View>
    </Pressable>
  );
};

export default PressableButton;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const PressableButton = ({ children, onPress, style, ripple }) => {
  return (
    <Pressable onPress={onPress}
    android_ripple={ripple}
    style={({pressed}) => [
      {
        opacity: pressed ? 0.5 : 1,
      },
      style,
    ]}>
      <View>{children}</View>
    </Pressable>
  );
};

export default PressableButton;

const styles = StyleSheet.create({});

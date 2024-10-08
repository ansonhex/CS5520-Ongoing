import React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";

const GoalItem = ({ goal, onDeleteGoal }) => {
  // update to useNavigation
  const navigation = useNavigation();
  rippleConfig = {
    borderless: false,
    color: "purple",
  };

  return (
    <View style={styles.goalContainer}>
      <Pressable
        onPress={() => navigation.navigate("Details", { goal })}
        android_ripple={rippleConfig}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.2 : 1,
          },
          styles.goals,
        ]}
      >
        <Text style={styles.text}>{goal.text}</Text>
        <PressableButton
          onPress={() => onDeleteGoal(goal.id)}
          ripple={rippleConfig}
          pressedStyle={{opacity: 0.5}}
          style={{ backgroundColor: "red", borderRadius: 5, padding: 5 }}
        >
          <Text>X</Text>
        </PressableButton>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    margin: 10,
    backgroundColor: "#FBECDE",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  text: {
    color: "purple",
    fontSize: 40,
    fontWeight: "bold",
  },
  goals: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    width: "100%",
  },
});

export default GoalItem;

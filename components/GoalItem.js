import React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
        <Button title="X" color="red" onPress={() => onDeleteGoal(goal.id)} />
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

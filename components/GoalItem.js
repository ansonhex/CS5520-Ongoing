import React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GoalItem = ({ goal, onDeleteGoal }) => {
  // update to useNavigation
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Details", { goal })}>
      <View style={styles.goalContainer}>
        <Text style={styles.text}>{goal.text}</Text>
        <Button title="X" color="red" onPress={() => onDeleteGoal(goal.id)} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    margin: 10,
    padding: 10,
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
});

export default GoalItem;

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GoalItem = ({ goal, onDeleteGoal, onShowDetails }) => {
  return (
    <View style={styles.goalContainer}>
      <Text style={styles.text}>{goal.text}</Text>
      <Button
        title="X"
        color="red"
        onPress={() => onDeleteGoal(goal.id)}
      />
      <Button
        title="i"
        color="blue"
        onPress={() => onShowDetails(goal)}
      />
    </View>
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
  }
});

export default GoalItem;

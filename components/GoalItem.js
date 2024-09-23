import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalItem = ({ goal }) => {
  return (
    <View style={styles.goalContainer}>
      <Text style={styles.text}>{goal.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  goalContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FBECDE",
    borderRadius: 5,
  },
  text: {
    color: "purple",
    fontSize: 40,
    fontWeight: "bold",
  }
});

export default GoalItem;

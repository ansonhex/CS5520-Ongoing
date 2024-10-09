import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PressableButton from "./PressableButton";
import Feather from "@expo/vector-icons/Feather";

const GoalItem = ({ goal, onDeleteGoal }) => {
  // update to useNavigation
  const navigation = useNavigation();
  rippleConfig = {
    borderless: false,
    color: "purple",
  };

  // handle long press
  const handleLongPress = () => {
    Alert.alert("Delete Goal?", "Are you sure you want to delete this goal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => onDeleteGoal(goal.id),
      },
    ]);
  };

  return (
    <View style={styles.goalContainer}>
      <Pressable
        onPress={() => navigation.navigate("Details", { goal })}
        android_ripple={rippleConfig}
        onLongPress={handleLongPress}
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
          pressedStyle={{ opacity: 0.5 }}
          style={{ alignSelf: "center" }}
        >
          <Feather name="trash" size={24} color="grey" />
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

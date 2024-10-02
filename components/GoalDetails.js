import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const GoalDetails = ({ route, navigation }) => {
  const { goal } = route.params || {};
  console.log(goal);

  return (
    <View>
      {goal?.id ? (
        <>
          <Text style={styles.title}>Goal Details</Text>
          <Text style={styles.text}>Goal ID: {goal.id}</Text>
          <Text style={styles.text}>Goal Text: {goal.text}</Text>
        </>
      ) : 
      (
        <Text style={styles.text}>More details</Text>
      )}

      <Button
        title="More Details"
        onPress={() =>
          navigation.push("Details")
        }
      />
    </View>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({});

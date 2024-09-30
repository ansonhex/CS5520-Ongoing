import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const GoalDetails = ({ route, navigation }) => {
  const { goal, showMoreDetails } = route.params;
  console.log(goal);

  return (
    <View>
      {showMoreDetails ? (
        <Text style={styles.text}>More details</Text>
      ) : (
        <>
          <Text style={styles.title}>Goal Details</Text>
          <Text style={styles.text}>Goal ID: {goal.id}</Text>
          <Text style={styles.text}>Goal Text: {goal.text}</Text>
        </>
      )}

      <Button
        title="More Details"
        onPress={() =>
          navigation.push("Details", { goal, showMoreDetails: true })
        }
      />
    </View>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({});

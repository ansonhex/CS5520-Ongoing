import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";

const GoalDetails = ({ route, navigation }) => {
  const { goal } = route.params || {};
  console.log(goal);

  // states for button to trigger
  const [textColor, setTextColor] = useState("purple");
  const [isWarning, setIsWarning] = useState(false);

  // useEffect to monitor the state of isWarning
  useEffect(() => {
    if (!isWarning) {
      navigation.setOptions({
        title: goal?.text || "Goal Details",
        headerRight: () => (
          <Button title="Warning" onPress={handleWarning} />
        ),
      });
    }
  }, [isWarning, navigation]);

  const handleWarning = () => {
    setTextColor("red");
    setIsWarning(true);
    navigation.setOptions({
      title: "Warning!",
    });
  };

  return (
    <View style={styles.container}>
      {goal?.id ? (
        <>
          <Text style={[styles.title, { color: textColor }]}>Goal Details</Text>
          <Text style={[styles.text, { color: textColor }]}>
            Goal ID: {goal.id}
          </Text>
          <Text style={[styles.text, { color: textColor }]}>Goal Text: {goal.text}</Text>
        </>
      ) : (
        <Text style={[styles.text, {color: textColor}]}>More details</Text>
      )}

      <Button title="More Details" onPress={() => navigation.push("Details")} />
    </View>
  );
};

export default GoalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D3B0E0",
  },
  title: {
    fontSize: 24,
    margin: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    margin: 10,
    marginBottom: 10,
  },
});

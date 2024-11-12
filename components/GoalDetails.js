import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useEffect } from "react";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import { updateWarning } from "../firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";

const GoalDetails = ({ route, navigation }) => {
  const { goal } = route.params || {};
  console.log(goal);

  // states for button to trigger
  const [textColor, setTextColor] = useState("purple");
  const [isWarning, setIsWarning] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch image URL if imageUri is present
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (goal?.imageUri) {
        try {
          const imageRef = ref(storage, goal.imageUri);
          const url = await getDownloadURL(imageRef);
          console.log("Image URL:", url);
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
    };

    fetchImageUrl();
  }, [goal?.imageUri]);

  // useEffect to monitor the state of isWarning
  useEffect(() => {
    if (!isWarning) {
      navigation.setOptions({
        title: goal?.text || "Goal Details",
        headerRight: () => (
          <PressableButton
            onPress={handleWarning}
            pressedStyle={{ opacity: 0.5 }}
          >
            <AntDesign name="warning" size={24} color="red" />
          </PressableButton>
        ),
      });
    }
  }, [isWarning, navigation]);

  const handleWarning = async () => {
    setTextColor("red");
    setIsWarning(true);
    navigation.setOptions({
      title: "Warning!",
    });

    if (goal?.id) {
      await updateWarning("Goals", goal.id);
    }
  };

  return (
    <View style={styles.container}>
      {goal?.id ? (
        <>
          <Text style={[styles.title, { color: textColor }]}>Goal Details</Text>
          <Text style={[styles.text, { color: textColor }]}>
            Goal ID: {goal.id}
          </Text>
          <Text style={[styles.text, { color: textColor }]}>
            Goal Text: {goal.text}
          </Text>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </>
      ) : (
        <Text style={[styles.text, { color: textColor }]}>More details</Text>
      )}
      <Button title="More Details" onPress={() => navigation.push("Details")} />
      <GoalUsers goalId={goal?.id} />
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
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

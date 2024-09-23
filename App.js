import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import React, { useState } from "react";

export default function App() {
  const appName = "AnsonHe App";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const handleInputData = (UserData) => {
    console.log(UserData);

    const newGoal = { text: UserData, id: Math.random().toString() };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top */}
      <View style={styles.top}>
        <Header name={appName} />
        <View style={styles.buttonScheme}>
          <Button title="Add a goal" onPress={() => setIsModalVisible(true)} />
        </View>
        <Input
          autoFocus={false}
          inputData={handleInputData}
          onCancel={handleCancel}
          modal={isModalVisible}
        />
        <StatusBar style="auto" />
      </View>

      {/* Bottom */}
      <View style={styles.bottom}>
        <FlatList
          data={goals}
          renderItem={(itemData) => (
            <Text style={styles.text}>{itemData.item.text}</Text>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    flex: 4,
    backgroundColor: "#D3B0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "purple",
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonScheme: {
    backgroundColor: "#FBECDE",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  goalContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FBECDE",
    borderRadius: 5,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  }
});

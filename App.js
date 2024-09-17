import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";
import React, { useState } from "react";

export default function App() {
  const appName = "AnsonHe App";
  const [data, setData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleInputData = (UserData) => {
    console.log(UserData);
    setData(UserData);
    setIsModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Header name={appName} />
      <Input autoFocus={true} inputData={handleInputData} modal={isModalVisible} />
      <StatusBar style="auto" />
      <Text>{data}</Text>
      <Button title="Add a goal" onPress={() => setIsModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

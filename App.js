import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, SafeAreaView } from "react-native";
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Header name={appName} />
        <Input
          autoFocus={true}
          inputData={handleInputData}
          modal={isModalVisible}
        />
        <StatusBar style="auto" />

        <View style={styles.bottom}>
          <Button title="Add a goal" onPress={() => setIsModalVisible(true)} />
        </View>
      </View>

      <Text>{data}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#ccc",
    width: "30%",
    padding: 10,
  },
  top: {
    flex: 1,
    alignItems: "center",
  },
  bottom: {
    flex: 4,
    backgroundColor: "purple",
  },
});

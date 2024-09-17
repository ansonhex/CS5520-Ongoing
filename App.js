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
      {/* Top */}
      <View style={styles.top}>
        <Header name={appName} />
        <View style={styles.buttonScheme}>
          <Button title="Add a goal" onPress={() => setIsModalVisible(true)} />
        </View>
        <Input
          autoFocus={true}
          inputData={handleInputData}
          modal={isModalVisible}
        />
        <StatusBar style="auto" />
      </View>

      {/* Bottom */}
      <View style={styles.bottom}>
        <Text style={styles.text}>{data}</Text>
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
  }
});

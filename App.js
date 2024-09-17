import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  const appName = "AnsonHe App";
  const [data, setData] = setState("");
  
  const handleInputData = (UserData) => {
    console.log(UserData);
    setData(UserData);
  }

  return (
    <View style={styles.container}>
      <Header name={appName} />
      <Input autoFocus={true} inputData={handleInputData} />
      <StatusBar style="auto" />
      <Text>{data}</Text>
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

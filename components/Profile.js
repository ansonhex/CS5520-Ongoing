import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseSetup";

const Profile = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert("Error signing out", error.message);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={{ color: "#fff", marginRight: 10 }}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Text>User ID: {auth.currentUser?.uid}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});

export default Profile;

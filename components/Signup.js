import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    // checks
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Email and password are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created: ", userCredential.user);
      return;
    } catch (error) {
      console.error(error);
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Button title="Register" onPress={handleSignup} />

      <Text style={styles.link} onPress={() => navigation.replace("Login")}>
        Already Registered? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  link: {
    color: "blue",
    marginTop: 10,
    textAlign: "center",
  },
});

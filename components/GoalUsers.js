import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`Http error: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    // call the function
    fetchData();
  }, []);
  return (
    <View>
      <Text>GoalUsers</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

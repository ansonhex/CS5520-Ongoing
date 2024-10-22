import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getAllDocuments, writeToDB } from "../firebase/firestoreHelper";

export default function GoalUsers({ goalId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!goalId) {
      // If goalId is undefined, return early
      return;
    }

    // fetch data
    const fetchData = async () => {
      try {
        const dataFromDb = await getAllDocuments(`Goals/${goalId}/Users`);
        console.log("dataFromDb: ", dataFromDb);

        if (dataFromDb.length > 0) {
          setUsers(
            dataFromDb.map((user) => {
              return user;
            })
          );
          return;
        }

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`Http error: ${response.status}`);
        }

        const data = await response.json();

        // Write the fetched data to Firestore
        await Promise.all(
          data.map(async (user) => {
            await writeToDB(`Goals/${goalId}/Users`, user);
          })
        );

        // Set the fetched users in state
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [goalId]);

  return (
    <View>
      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()} // Ensure unique key
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      ) : (
        <Text>No users found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

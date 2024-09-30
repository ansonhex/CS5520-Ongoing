import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import React, { useState } from "react";

export default function Home({ navigation }) {
  const appName = "AnsonHe App";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const handleInputData = (UserData) => {
    console.log(UserData);

    const newGoal = { text: UserData, id: Math.random().toString() };
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setIsModalVisible(false);
  };

  const onDeleteGoalHandler = (goalId) => {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const handleDeleteAllGoals = () => {
    Alert.alert(
      "Delete All Goals?",
      "Are you sure you want to delete all goals?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => setGoals([]) },
      ]
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Render empty component
  const renderEmptyComponent = () => {
    return <Text style={styles.noGoalsText}>No goals to show</Text>;
  };

  // Header
  const renderHeader = () => {
    return <Text style={styles.goalHeader}>My Goals</Text>;
  };

  const renderFooter = () => {
    return (
      <Button title="Delete All" color="red" onPress={handleDeleteAllGoals} />
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
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
            <GoalItem
              goal={itemData.item}
              onDeleteGoal={onDeleteGoalHandler}
              onShowDetails={() =>
                navigation.navigate("Details", { goal: itemData.item })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyComponent}
          ListHeaderComponent={goals.length > 0 ? renderHeader : null}
          ListFooterComponent={goals.length > 0 ? renderFooter : null}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.contentContainer}
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
    alignItems: "stretch",
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
  noGoalsText: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
  },
  goalHeader: {
    fontSize: 30,
    color: "purple",
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 3,
    width: "90%",
    backgroundColor: "black",
    alignSelf: "center",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GoalDetails = ({ route }) => {

  const { goal } = route.params;
  console.log(goal);

  return (
    <View>
      <Text style={styles.title}>Goal Details</Text>
      <Text style={styles.text}>Goal ID: {goal.id}</Text>
      <Text style={styles.text}>Goal Text: {goal.text}</Text>
    </View>
  )
}

export default GoalDetails

const styles = StyleSheet.create({})
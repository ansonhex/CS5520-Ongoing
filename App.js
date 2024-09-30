import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from './components/Home'
import GoalDetails from './components/GoalDetails'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={GoalDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type AuthStackParamList = {
  Signup: undefined;
  Login: undefined
};

const Stack = createNativeStackNavigator<AuthStackParamList>();


const AuthStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
        headerTitleAlign: 'center'
    }}
    >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  )
}

export default AuthStack
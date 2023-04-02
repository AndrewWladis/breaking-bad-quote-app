import ModalContent from './ModalContent';
import Questions from './Questions';
import Unlimited from './Unlimited';
import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Modal" >
        <Stack.Screen name="Questions" component={Questions} options={{headerShown: false, gestureDirection: 'vertical'}} />
        <Stack.Screen name="Modal" component={ModalContent} options={{headerShown: false, gestureDirection: 'vertical'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
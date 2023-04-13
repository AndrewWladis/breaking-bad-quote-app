import ModalContent from './ModalContent';
import Questions from './Questions';
import Unlimited from './Unlimited';
import TimedUnlimited from './TimedUnlimited'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Done from './Done';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Modal" >
        <Stack.Screen name="Questions" component={Questions} options={{headerShown: false, gestureDirection: 'vertical'}} />
        <Stack.Screen name="Modal" component={ModalContent} options={{headerShown: false, gestureDirection: 'vertical'}} />
        <Stack.Screen name="Unlimited" component={Unlimited} options={{headerShown: false, gestureDirection: 'vertical'}} />
        <Stack.Screen name="TimedUnlimited" component={TimedUnlimited} options={{headerShown: false, gestureDirection: 'vertical'}} />
        <Stack.Screen name="Done" component={Done} options={{headerShown: false, gestureDirection: 'horizontal'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
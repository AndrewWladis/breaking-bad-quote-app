import ModalContent from './ModalContent';
import Questions from './Questions';
import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@questionNumber', value)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@questionNumber')
    if(value !== null) {
      storeData(1)
    } else if(value >= 5) {
      //DON'T LET NAVIGATE TO NEW PAGE
    }
  } catch(e) {
    // error reading value
  }
}

export default function App() {
  const [questionNumber, setQuestionNumber] = useState(1);

  //call this func to get new info
  function changeQuote() {
    setQuestionNumber(questionNumber + 1);
  }

  getData();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Modal" >
        <Stack.Screen name="Questions" initialParams={{questionNumber: questionNumber}} component={Questions} options={{headerShown: false, gestureDirection: 'vertical'}} />
        <Stack.Screen name="Modal" component={ModalContent} options={{headerShown: false, gestureDirection: 'vertical'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
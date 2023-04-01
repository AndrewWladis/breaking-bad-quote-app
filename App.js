import ModalContent from './ModalContent';
import Questions from './Questions';
import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Data = require('./Data.json');

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
  const [quote, setQuote] = useState(Data.quotes[Math.floor(Math.random() * Data.quotes.length)]);
  const [questionNumber, setQuestionNumber] = useState(1);
  let usedQuestions = [];

  //call this func to get new info
  function changeQuote() {
    usedQuestions.push(quote.quote);
    let newQuote = Data.quotes[Math.floor(Math.random() * Data.quotes.length)];
    while (usedQuestions.includes(newQuote)) {
      newQuote = Data.quotes[Math.floor(Math.random() * Data.quotes.length)];
    }
    setQuote(newQuote);
    setQuestionNumber(questionNumber + 1);
  }

  const returnRandomArr = () => {
    let arr = [];
    let authorIndex = Math.floor(Math.random() * 4);
    let index = 0;
  
    for (let i = 0; i < 3; i++) {
        if (authorIndex === i) {
            arr.push(quote.author)
            index++
        }
        let character = Data.characters[Math.floor(Math.random() * Data.characters.length)];
        while (quote.author === character || arr.includes(character)) {
            character = Data.characters[Math.floor(Math.random() * Data.characters.length)];
        }
        arr.push(character)
        index++;
    }
    if (authorIndex === 3) {
        arr.push(quote.author)
        index++;
    }
    return arr;
  }

  getData();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Modal" >
        <Stack.Screen name="Questions" initialParams={{quote: quote, questionNumber: questionNumber, array: returnRandomArr() }} component={Questions} options={{headerShown: false, gestureDirection: 'vertical'}} />
        <Stack.Screen name="Modal" component={ModalContent} options={{headerShown: false, gestureDirection: 'vertical'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
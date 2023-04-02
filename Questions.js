import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react'
import styles from './styles'
import {useNetInfo} from "@react-native-community/netinfo";

var Filter = require('bad-words'),
filter = new Filter();

function Questions({ navigation }) {
    let colorArr = ['#ff3526', '#265cff', '#abab2c', '#39c21d'];

    const [color, setColors] = useState('normal');
    const [isLoad, setLoad] = useState(true)
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questionArr, setQuestionArr] = useState('');
    const [quote, setQuote] = useState({
        quote: {
            quote: 'Loading...',
            author: 'Andy Wladis'
        },
        options: ['Loading...', 'Loading...', 'Loading...', 'Loading...']
    });

    const netInfo = useNetInfo();
    
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
        } else if(value >= 11) {
            navigation.navigate('Modal');
        }
      } catch(e) {
        // error reading value
      }
    }

    const isAnswer = (ele) => {
        if (color === 'normal' && quote.quote.author != 'Andy Wladis') {
            if (ele === quote.quote.author) {
                setColors(colorArr[3])
                setQuestionArr(questionArr + '✅');
            } else {
                setColors(colorArr[0])
                setQuestionArr(questionArr + '❌');
            }
            if (questionNumber < 10) {
                setTimeout(() => {
                    setColors('normal')
                    fetch('http://localhost:3000/todayQuote')
                        .then(response => response.json())
                        .then(data => setQuote(data[questionNumber]))
                    setQuestionNumber(questionNumber + 1);
                }, 1500)
            } else {
                console.log(questionArr)
                //redirect to win page
            }
        }
    }
    getData();
      

    const returnColor = (num) => {
        if (color === 'normal') {
            return colorArr[num];
        } else {
            return color;
        }
    }
    
    if (isLoad) {
        fetch('http://localhost:3000/todayQuote')
            .then(response => response.json())
            .then(data => setQuote(data[0]))
        setLoad(false)
    }

    return (
        <View style={styles.questionContainer}>
            <Text style={styles.questionInfoHeader}>Question: {questionNumber}</Text>
            {netInfo.isConnected ? <View style={styles.quoteContainer}>
                <Text style={styles.quote}>"{filter.clean(quote.quote.quote)}"</Text>
            </View> : () => {navigation.navigate('Modal')} }
            {quote.options.map((element, index) => (
                <TouchableOpacity onPress={() => {isAnswer(element)}} key={index} style={[styles.option, { backgroundColor: returnColor(index),}]}>
                    <Text style={styles.optionText}>{element}</Text>
                </TouchableOpacity>
            ))}
        </View>

    )
}

export default Questions
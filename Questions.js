import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react'
import styles from './styles'
import {useNetInfo} from "@react-native-community/netinfo";
import LightBar from './LightBar';

var Filter = require('bad-words'),
filter = new Filter();

function Questions({ navigation }) {
    let colorArr = ['#ff3526', '#265cff', '#abab2c', '#39c21d'];
    const [color, setColors] = useState('normal');
    const [isLoad, setLoad] = useState(true)
    const [questionNumber, setQuestionNumber] = useState(0);
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
        await AsyncStorage.setItem('@questionNumber', value.toString())
      } catch (e) {
        // saving error
      }
    }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@questionNumber')
        const date = await AsyncStorage.getItem('@date')
        if (date !== date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()) {
            storeData("1")
            setQuestionNumber(1)
        } else {
            setQuestionNumber(Number(value));
        }
      } catch(e) {
        // error reading value
      }
    }
    const isAnswer = (ele) => {
        if (color === 'normal' && quote.quote.author != 'Andy Wladis' && questionNumber != 0) {
            if (ele === quote.quote.author) {
                setColors(colorArr[3])
                setQuestionArr(questionArr + '✅');
            } else {
                setColors(colorArr[0])
                setQuestionArr(questionArr + '❌');
            }
            console.log(questionArr, questionNumber)
            if (questionNumber < 10) {
                setTimeout(() => {
                    setColors('normal')
                    fetch('https://quote-cook-backend.onrender.com/todayQuote')
                        .then(response => response.json())
                        .then(data => setQuote(data[questionNumber]))
                    setQuestionNumber(questionNumber + 1);
                    storeData(questionNumber)
                }, 1500)
            } else {
                setTimeout(() => {
                    navigation.navigate('Done', { results: questionArr, })
                }, 1000)
            }
        } else if (questionNumber === 0) {
            setQuestionArr(questionArr + '❌');
            setQuestionNumber(1);
        }
        //console.log(questionArr, questionNumber)
    }
    if (isLoad) {
        fetch('https://quote-cook-backend.onrender.com/todayQuote')
            .then(response => response.json())
            .then(data => setQuote(data[0]))
        setLoad(false)
    }

    if (questionNumber < 1) {
        isAnswer()
    }

    getData();

    const returnColor = (num) => {
        if (color === 'normal') {
            return colorArr[num];
        } else {
            return color;
        }
    }

    return (
        <View style={styles.questionContainer}>
            <LightBar />
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
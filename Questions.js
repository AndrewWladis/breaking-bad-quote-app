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
    const [isLoad, setLoad] = useState(true);
    const [quoteOpacity, setQuoteOpacity] = useState(1)
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


    useEffect(() => {
        if (quote.quote.quote != 'Loading...') {
            setQuoteOpacity(1)
        } else {
            setQuoteOpacity(0)
        }
    }, [quote]);

    function blankState() {
        setQuote({
            quote: {
                quote: 'Loading...',
                author: 'Andy Wladis'
            },
            options: [' ', ' ', ' ', ' ']
        });
    }
    
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
                    blankState()
                    fetch('https://quote-cook-backend.onrender.com/todayQuote')
                        .then(response => response.json())
                        .then(data => setQuote(data[questionNumber]))
                    setQuestionNumber(questionNumber + 1);
                    storeData(questionNumber)
                }, 1500)
            } else {
                setTimeout(() => {
                    navigation.navigate('Done', { results: '✅' + questionArr, })
                }, 1000)
            }
        }
    }
    if (isLoad) {
        fetch('https://quote-cook-backend.onrender.com/todayQuote')
            .then(response => response.json())
            .then(data => setQuote(data[0]))
        setLoad(false)
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
                <Text style={[styles.quote, {opacity: quoteOpacity}]}>"{filter.clean(quote.quote.quote)}"</Text>
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
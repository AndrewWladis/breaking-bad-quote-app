import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react'
import styles from './styles'
import {useNetInfo} from "@react-native-community/netinfo";
import LightBar from './LightBar';

var Filter = require('bad-words'),
filter = new Filter();

function TimedUnlimited({ navigation }) {
    let colorArr = ['#ff3526', '#265cff', '#abab2c', '#39c21d'];
    const [color, setColors] = useState('normal');
    const [isLoad, setLoad] = useState(true);
    const [quoteOpacity, setQuoteOpacity] = useState(1);
    const [questionArr, setQuestionArr] = useState('');
    const [timer, setTimer] = useState(15);
    const [quote, setQuote] = useState({
        quote: {
            quote: 'Loading...',
            author: 'Andy Wladis'
        },
        options: ['Loading...', 'Loading...', 'Loading...', 'Loading...']
    });

    const netInfo = useNetInfo();

    useEffect(() => {
        const interval = setInterval(() => {
          setTimer(timer => timer - 1);
      
          if (timer <= 0) {
            isAnswer('Andy');
            clearInterval(interval);
            setTimer(0)
          }
        }, 1000);
        
        return () => clearInterval(interval);
      }, [isAnswer, timer]);  

    useEffect(() => {
        if (quote.quote.quote != 'Loading..') {
            setQuoteOpacity(1)
            setTimer(15)
        } else {
            setQuoteOpacity(0)
        }
    }, [quote]);

    function blankState() {
        setQuote({
            quote: {
                quote: 'Loading..',
                author: 'Andy Wladis'
            },
            options: [' ', ' ', ' ', ' ']
        });
    }

    const isAnswer = (ele) => {
        if (color === 'normal' && quote.quote.author != 'Andy Wladis') {
            if (ele === quote.quote.author) {
                setColors(colorArr[3])
            } else {
                setColors(colorArr[0])
            }
            setTimeout(() => {
                setColors('normal')
                fetch('https://quote-cook-backend.onrender.com/randomQuote')
                    .then(response => response.json())
                    .then(data => setQuote(data))
            }, 1100)
        }
    }
    if (isLoad) {
        fetch('https://quote-cook-backend.onrender.com/randomQuote')
            .then(response => response.json())
            .then(data => setQuote(data[0]))
        setLoad(false)
    }

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
            <View style={styles.headerContainer}>
                <Text style={styles.questionInfoHeader}>Unlimited</Text>
                <Text style={[styles.timer]}>{timer}</Text>
            </View>
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

export default TimedUnlimited
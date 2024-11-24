import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react'
import styles from './styles'
import LightBar from './LightBar';
import data from './data.json'

var Filter = require('bad-words'),
filter = new Filter();

function Questions({ navigation }) {
    let colorArr = ['#ff3526', '#265cff', '#abab2c', '#39c21d'];
    const [color, setColors] = useState('normal');
    const [isLoad, setLoad] = useState(true);
    const [quoteOpacity, setQuoteOpacity] = useState(1)
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questionArr, setQuestionArr] = useState('');
    const [quoteArr, setQuoteArr] = useState([]);
    const [timer, setTimer] = useState(15);
    const [quote, setQuote] = useState({
        quote: {
            quote: 'Loading...',
            author: 'Andy Wladis'
        },
        options: ['Loading...', 'Loading...', 'Loading...', 'Loading...']
    });



function isEvenDay() {
    return new Date().getDay() % 2 == 0;
}

function returnArr(quote) {
    let arr = [];
    let num = 0;

    while (num < quote.quote.length) {
        num += 4;
    }

    let quoteIndex = num - quote.quote.length;
    let index = quote.quote.split(/([Ee])/).length - 1
    while (arr.length < 4) {
        if (quoteIndex === arr.length) {
            arr.push(quote.author)
        } else {
            index *= 2;
            if (index < 0) {
                index *= -2;
            }
            if (index >= data.quotes.length) {
                index -= data.quotes.length;
            }
            if (!arr.includes(data.quotes[index].author) && data.quotes[index].author != quote.author) {
                arr.push(data.quotes[index].author)
            } else {
                index -= 1
            }
        }
    }
    return arr;
}

    function returnQuoteFromNum(big) {
        let reversedArr;

        if (isEvenDay()) {
            reversedArr = data.quotes.slice();
        } else {
            reversedArr = data.quotes.slice().reverse();
        }

        let arr = [];

        for (let i = 4; i < 14; i++) {
            let num = big * (i * 2);
            while (num >= reversedArr.length) {
                num -= reversedArr.length;
            }
            let currentQuote = reversedArr[num];
            arr.push({
                quote: currentQuote,
                options: returnArr(currentQuote)
            })
        }

        
        setQuoteArr(arr)
        setQuote(arr[0])
    }


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
    
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('@questionNumber', value.toString())
      } catch (e) {
        // saving error
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
                    setQuote(quoteArr[questionNumber])
                    setQuestionNumber(questionNumber + 1);
                }, 1500)
            } else {
                setTimeout(() => {
                    navigation.navigate('Done', { results: '✅' + questionArr, })
                }, 1000)
            }
        }
    }

    const returnColor = (num) => {
        if (color === 'normal') {
            return colorArr[num];
        } else {
            return color;
        }
    }

    useEffect(() => {
        returnQuoteFromNum(Math.floor((new Date().getDay() + 3) * (new Date().getDate() + new Date().getMonth())))
    }, [])

    return (
        <View style={styles.questionContainer}>
            <LightBar />
            <View style={styles.headerContainer}>
                <Text style={styles.questionInfoHeader}>Question: {questionNumber}</Text>
                <Text style={[styles.timer]}>{timer}</Text>
            </View>
            <View style={styles.quoteContainer}>
                <Text style={[styles.quote, {opacity: quoteOpacity}]}>"{filter.clean(quote.quote.quote)}"</Text>
            </View>
            {quote.options.map((element, index) => (
                <TouchableOpacity onPress={() => {isAnswer(element)}} key={index} style={[styles.option, { backgroundColor: returnColor(index),}]}>
                    <Text style={styles.optionText}>{element}</Text>
                </TouchableOpacity>
            ))}
        </View>

    )
}

export default Questions
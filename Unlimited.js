import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'
import {useNetInfo} from "@react-native-community/netinfo";
import LightBar from './LightBar';
import data from './data.json'

var Filter = require('bad-words'),
filter = new Filter();

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

function Unlimited({ navigation }) {
    let colorArr = ['#ff3526', '#265cff', '#abab2c', '#39c21d'];
    const [color, setColors] = useState('normal');
    const [isLoad, setLoad] = useState(true)
    const [quote, setQuote] = useState({
        quote: {
            quote: 'Loading...',
            author: 'Andy Wladis'
        },
        options: ['Loading...', 'Loading...', 'Loading...', 'Loading...']
    });

    const netInfo = useNetInfo();
    

    const isAnswer = (ele) => {
        if (color === 'normal' && quote.quote.author != 'Andy Wladis') {
            if (ele === quote.quote.author) {
                setColors(colorArr[3])
            } else {
                setColors(colorArr[0])
            }
            setTimeout(() => {
                setColors('normal')
                setQuote({
                    quote: data.quotes[Math.floor(Math.random() * data.quotes.length) - 1],
                    options: returnArr(data.quotes[Math.floor(Math.random() * data.quotes.length) - 1])
                })
            }, 1500)
        }
    }
    
    if (isLoad) {
        setQuote({
            quote: data.quotes[Math.floor(Math.random() * data.quotes.length) - 1],
            options: returnArr(data.quotes[Math.floor(Math.random() * data.quotes.length) - 1])
        })
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
            <Text style={styles.unlimitedHeader}>Unlimited</Text>
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

export default Unlimited
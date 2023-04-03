import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'
import {useNetInfo} from "@react-native-community/netinfo";

var Filter = require('bad-words'),
filter = new Filter();

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
                fetch('https://quote-cook-backend.onrender.com/randomQuotes')
                    .then(response => response.json())
                    .then(data => setQuote(data))
            }, 1500)
        }
    }
    
    if (isLoad) {
        fetch('https://quote-cook-backend.onrender.com/randomQuotes')
            .then(response => response.json())
            .then(data => setQuote(data))
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
            <Text style={styles.questionInfoHeader}>Unlimited</Text>
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
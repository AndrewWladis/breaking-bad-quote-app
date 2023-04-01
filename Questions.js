import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'

var Filter = require('bad-words'),
filter = new Filter();

function Questions({ route }) {
    let colorArr = ['#ff3526', '#265cff', '#abab2c', '#39c21d'];
    const [color, setColors] = useState('normal');
    const [quote, setQuote] = useState({
        quote: {
            quote: 'Loading...',
            author: 'Andy Wladis'
        },
        options: ['Loading...', 'Loading...', 'Loading...', 'Loading...']
    });

    const isAnswer = (ele) => {
        if (color === 'normal' && quote.quote.author != 'Andy Wladis') {
            if (ele === quote.quote.author) {
                setColors(colorArr[3])
            } else {
                setColors(colorArr[0])
            }
        }
    }

    const getData = () => {
        fetch('http://localhost:3000/todayQuote')
        .then(response => response.json())
        .then(data => setQuote(data[route.params.questionNumber - 1]))
    }

    getData()
      

    const returnColor = (num) => {
        if (color === 'normal') {
            return colorArr[num];
        } else {
            return color;
        }
    }

    return (
        <View style={styles.questionContainer}>
            <Text style={styles.questionInfoHeader}>Question: {route.params.questionNumber}</Text>
            <View style={styles.quoteContainer}>
                <Text style={styles.quote}>"{filter.clean(quote.quote.quote)}"</Text>
            </View>
            {quote.options.map((element, index) => (
                    <TouchableOpacity onPress={() => {isAnswer(element)}} key={index} style={[styles.option, { backgroundColor: returnColor(index), }]}>
                        <Text style={styles.optionText}>{element}</Text>
                    </TouchableOpacity>
            ))}
        </View>
    )
}

export default Questions
import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'

var Filter = require('bad-words'),
filter = new Filter();

function Questions({ route }) {
    let colorArr = ['#ff3526', '#265cff', '#abab2c', '#39c21d'];
    const [color, setColors] = useState('normal');

    const isAnswer = (ele) => {
        if (color === 'normal') {
            if (ele === route.params.quote.author) {
                setColors(colorArr[3])
            } else {
                setColors(colorArr[0])
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

    return (
        <View style={styles.questionContainer}>
            <Text style={styles.questionInfoHeader}>Question: {route.params.questionNumber}</Text>
            <View style={styles.quoteContainer}>
                <Text style={styles.quote}>"{filter.clean(route.params.quote.quote)}"</Text>
            </View>
            {route.params.array.map((element, index) => (
                    <TouchableOpacity onPress={() => {isAnswer(element)}} key={index} style={[styles.option, { backgroundColor: returnColor(index), }]}>
                        <Text style={styles.optionText}>{element}</Text>
                    </TouchableOpacity>
            ))}
        </View>
    )
}

export default Questions
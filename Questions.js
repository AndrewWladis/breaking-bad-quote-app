import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'

const Data = require('./Data.json');

var Filter = require('bad-words'),
filter = new Filter();

export default function Questions() {

    function returnRandomArr(author) {
        let arr = []
        let authorIndex = Math.floor(Math.random() * 4);
        for (let i = 0; i < 3; i++) {
            if (authorIndex === i) {
                arr.push(author)
            }
            let character = Data.characters[Math.floor(Math.random() * Data.characters.length)];
            while (author === character || arr.includes(character)) {
                character = Data.characters[Math.floor(Math.random() * Data.characters.length)];
            }
            arr.push(character);
        }
        if (authorIndex === 3) {
            arr.push(author)
        }
        return arr;
    }

    const [quote, setQuote] = useState(Data.quotes[Math.floor(Math.random() * Data.quotes.length)]);
    let arr = returnRandomArr(quote.author);


    return (
        <View style={styles.questionContainer}>
            <View style={styles.quoteContainer}>
                <Text style={styles.quote}>"{filter.clean(quote.quote)}"</Text>
            </View>
            <TouchableOpacity style={[styles.option, { backgroundColor: '#ff3526', }]}>
                <Text style={styles.optionText}>{arr[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, { backgroundColor: '#265cff', }]}>
                <Text style={styles.optionText}>{arr[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, { backgroundColor: '#abab2c', }]}>
                <Text style={styles.optionText}>{arr[2]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, { backgroundColor: '#39c21d', }]}>
                <Text style={styles.optionText}>{arr[3]}</Text>
            </TouchableOpacity>
        </View>
    )
}
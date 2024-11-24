import { View, Text, TouchableOpacity, Share, Alert } from 'react-native'
import React, {useRef} from 'react'
import styles from './styles'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LightBar from './LightBar';

function Done({ route, navigation }) {
    const scoreArr = ["You are not the guy. You're not capable of being the guy.", "No more half measures.", "You're the smartest guy I ever met.", "You're the smartest guy I ever met."];
    let results = route.params.results;
    let score = results.match(/✅/g).length;
    let quotematchingscore = scoreArr[Math.floor(score / 3)];
    let date = new Date();

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@date', value)
        } catch (e) {
            console.log(e)
          // saving error
        }
    }

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
            `Score on ${(date.getMonth() + 1) + '/' + date.getDate()}: ${results}
            "${quotematchingscore}"
            from Quote Cook, now on iOS`,
            //put link to app store here later
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
            console.log(error)
        }
    };

    const returnColor = () => {
        if (score >= 7) {
            return '#80f28e'
        } else if (score < 7 && score > 4) {
            return '#ebde34'
        } else if (score <= 4) {
            return '#f2493a'
        }
    }

    return (
        <View style={styles.resultContainer}>
          <LightBar />
                <View style={styles.resultQuoteContainer}>
                    <Text style={styles.endQuote}>"{quotematchingscore}"</Text>
                    <Text style={[styles.score, {color: returnColor()}]}>{score}/10</Text>
                    <Text style={styles.date}>{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('Modal')}} style={styles.startButton}>
                      <Text style={styles.startText}>Back Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onShare} style={styles.startButton}>
                      <Text style={styles.startText}>Share</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default Done
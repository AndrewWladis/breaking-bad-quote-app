import { View, Text, TouchableOpacity, Share, Alert } from 'react-native'
import React, {useRef} from 'react'
import styles from './styles'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Done({ route, navigation }) {
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const scoreArr = ["You are not the guy. You're not capable of being the guy.", "No more half measures.", "You're the smartest guy I ever met."];
    let results = route.params.results;
    let score = results.match(/✅/g).length;
    let quotematchingscore = scoreArr[Math.floor(score / 3) - 1];
    let date = new Date();

    if (status === null) {
        requestPermission();
    }

    const storeData = async (value) => {
        console.log(value, 'hi')
        try {
          await AsyncStorage.setItem('@date', value)
          console.log('hi')
        } catch (e) {
            console.log(e)
          // saving error
        }
    }


    storeData(date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear())

    const imageRef = useRef();

    const onSaveImageAsync = async () => {
        try {
          const localUri = await captureRef(imageRef, {
            height: 440,
            quality: 1,
          });
    
          await MediaLibrary.saveToLibraryAsync(localUri);
          if (localUri) {
            Alert.alert('Score saved to photos!');
          }
        } catch (e) {
          console.log(e);
        }
    };

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
            `Score: ${results}
            "${quotematchingscore}"
            from QuoteCook`,
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
                <View style={styles.resultQuoteContainer} ref={imageRef}>
                    <Text style={styles.quote}>"{quotematchingscore}"</Text>
                    <Text style={[styles.score, {color: returnColor()}]}>{score}/10</Text>
                    <Text style={styles.date}>{date.getMonth()}/{date.getDate()}/{date.getFullYear()}</Text>
                </View>
                <View style={styles.optionicons}>
                    <TouchableOpacity onPress={onSaveImageAsync} style={styles.save}>
                        <MaterialIcons name="add-photo-alternate" size={75} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('Modal')}} style={styles.home}>
                        <MaterialIcons name="home-filled" size={80} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onShare} style={styles.share}>
                        <MaterialCommunityIcons name="share" size={80} color="white" />
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default Done
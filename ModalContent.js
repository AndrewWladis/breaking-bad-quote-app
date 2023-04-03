import { View, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import React from 'react';
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalContent({ navigation }) {
    const netInfo = useNetInfo();
      
    const getData = async () => {
        let date = new Date();
        try {
          const value = await AsyncStorage.getItem('@date');
          if(value === date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()) {
            Alert.alert('You already played today', 'Please check back in tomorrow for a new round of questions.');
          } else {
            navigation.navigate('Questions')
          }
        } catch(e) {
          // error reading value
        }
    }

    return (
        <View style={styles.modal} animationType="fade" transparent={true} >
            <View style={styles.modalContent}>
                <Pressable style={styles.modalInfo}>
                    <Text style={styles.modalHeader}>Welcome to Quote Cook!</Text>
                    <View style={styles.modalBreak}></View>
                    <Text style={styles.modalText}>- A game where you have to guess who said the famous Breaking Bad Quote</Text>
                    <Text style={styles.modalText}>- You can only play once a day, so make your time count!</Text>
                    {netInfo.isConnected ? <TouchableOpacity onPress={getData} style={styles.startButton}>
                        <Text style={styles.startText}>Today's Challenge</Text>
                </TouchableOpacity> : null}
                </Pressable>
            </View>
        </View>
    )
}
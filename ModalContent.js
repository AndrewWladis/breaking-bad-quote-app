import { View, Text, TouchableOpacity, Easing, Animated, Alert } from 'react-native';
import styles from './styles';
import React, { useState, useEffect } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LightBar from './LightBar';

export default function ModalContent({ navigation }) {
  const netInfo = useNetInfo();

  const getData = async () => {
    let date = new Date();
    try {
      const value = await AsyncStorage.getItem('@date');
      if (value === date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()) {
        Alert.alert('You already played today', 'Please check back in tomorrow for a new round of questions.');
      } else {
        navigation.navigate('Questions')
      }
    } catch (e) {
      // error reading value
    }
  }

  return (
    <View style={styles.modal} animationType="fade" transparent={true} >
      <LightBar />
            <View style={styles.modalContent}>
                <View style={styles.modalInfo}>
                    <Text style={styles.modalHeader}>Welcome to Quote Cook!</Text>
                    <View style={styles.modalBreak}></View>
                    <Text style={styles.modalText}>- The game where you have 15 seconds to guess who said the famous Breaking Bad Quote</Text>
                    <Text style={styles.modalText}>- You can only play once a day, so make your time count!</Text>
                    {netInfo.isConnected ? [ [getData, "Today's Challenge"], [() => navigation.navigate('Unlimited'), "Unlimited"]].map((arr) => (
                      <TouchableOpacity key={arr[1]} onPress={arr[0]} style={styles.startButton}>
                        <Text style={styles.startText}>{arr[1]}</Text>
                      </TouchableOpacity>
                    )) : null}
                </View>
            </View>
    </View>
  )
}
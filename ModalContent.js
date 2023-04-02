import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import styles from './styles';
import React from 'react';
import {useNetInfo} from "@react-native-community/netinfo";

export default function ModalContent({ navigation }) {
    const netInfo = useNetInfo();
    return (
        <View style={styles.modal} animationType="fade" transparent={true} >
            <View style={styles.modalContent}>
                <Pressable style={styles.modalInfo}>
                    <Text style={styles.modalHeader}>Welcome to Quote Cook!</Text>
                    <View style={styles.modalBreak}></View>
                    <Text style={styles.modalText}>- A game where you have 20 seconds to guess who said the famous Breaking Bad Quote</Text>
                    <Text style={styles.modalText}>- You can only play once a day, so make your time count!</Text>
                    {netInfo.isConnected ? <TouchableOpacity onPress={() => navigation.navigate('Questions')} style={styles.startButton}>
                        <Text style={styles.startText}>Today's Challenge</Text>
                    </TouchableOpacity> : null}
                </Pressable>
            </View>
        </View>
    )
}
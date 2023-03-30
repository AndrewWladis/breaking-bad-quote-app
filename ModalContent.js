import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import styles from './styles';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ModalContent({ navigation }) {
    return (
        <View style={styles.modal} animationType="fade" transparent={true} >
            <View style={styles.modalContent}>
                <Pressable style={styles.modalInfo}>
                    <Text style={styles.modalHeader}>Welcome to Quote Cook!</Text>
                    <View style={styles.modalBreak}></View>
                    <Text style={styles.modalText}>- A game where you have 20 seconds to guess who said the famous Breaking Bad Quote</Text>
                    <Text style={styles.modalText}>- You can only play once a day, so make your time count!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Questions')} style={styles.startButton}>
                        <Text style={styles.startText}>Start</Text>
                    </TouchableOpacity>
                </Pressable>
            </View>
        </View>
    )
}
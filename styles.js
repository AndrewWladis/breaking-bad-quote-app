import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#171717'
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#171717'
    }, 
    modalBreak: {
        borderBottomColor: '#80f28e',
        alignSelf: 'stretch',
        marginHorizontal: 10,
        borderWidth: 1
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#171717'
    },
    modalHeader: {
        fontSize: 50,
        color: '#0bb520',
        fontWeight: 600,
        marginTop: 5,
        textAlign: 'center',
        marginVertical: 5
    },
    modalInfo: {
        width: 375,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: '#80f28e',
        borderWidth: 2,
        borderRadius: 25
    },
    modalText: {
        fontSize: 30,
        color: '#80f28e',
        paddingHorizontal: 20,
        paddingVertical: 15,
        textAlign: 'center'
    },
    option: {
        flex: 0.75,
        width: '94%',
        borderRadius: 50,
        marginBottom: 20,
        justifyContent: "center"
    },
    optionText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 600
    },
    questionContainer: {
        flex: 1,
        backgroundColor: '#171717',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
    },
    questionInfoHeader: {
        fontSize: 35,
        marginTop: 45,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    quote: {
        color: 'white',
        fontSize: 32,
        padding: 20,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    quoteContainer: {
        flex: 3,
        borderColor: 'green',
        borderWidth: 5,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#424242',
        width: '94%',
        justifyContent: 'center',
    },
    startButton: {
        backgroundColor: 'green',
        borderRadius: 23,
        margin: 20,
    },
    startText: {
        fontSize: 32,
        fontFamily: 'HiraginoSans-W6',
        color: 'white',
        padding: 10,
    }
});

export default styles;
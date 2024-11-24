import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttons: {
        alignItems: 'center',
        marginTop: 40
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#171717'
    },
    date: {
        color: 'white',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 27,
        marginVertical: 20,
    },
    endQuote: {
        color: '#b5b5b5',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '400',
        fontSize: 25,
        padding: 20,
    },
    headerContainer: {
        width: '100%',
        marginTop: 45,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#171717'
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#171717'
    },
    modalHeader: {
        fontSize: 55,
        color: '#21A179',
        fontWeight: 800,
        marginTop: 5,
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 5,
    },
    modalInfo: {
        width: '97%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    modalText: {
        fontSize: 27,
        color: '#80f28e',
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center'
    },
    option: {
        flex: 0.75,
        width: '94%',
        borderRadius: 50,
        marginBottom: 20,
        justifyContent: "center"
    },
    optionicons: {
        width: '100%',
        flexDirection: 'column',
        alignItems: "center",
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
        fontSize: '50%',
        fontWeight: 'bold',
        color: 'white',
        margin: 0,
        padding: 0,
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
    resultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#171717',
    },
    resultQuoteContainer: {
        height: '50%',
        width: '96%',
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: '#171717',
    },
    score: {
        fontSize: 110,
        fontWeight: "900"
    },
    share: {
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 96,
        height: 96,
        backgroundColor: '#53c429',
        borderRadius: 35,
        shadowColor: "green",
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 4},
    },
    startButton: {
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: '#21A179'
    },
    startText: {
        fontSize: 30,
        fontFamily: 'HiraginoSans-W6',
        color: 'white',
        padding: 10,
    },
    timer: {
        fontSize: '45%',
        fontWeight: '900',
        color: 'white',
        margin: 0,
        width: '20%',
        borderColor: '#80f28e',
        borderWidth: 4,
        textAlign: 'center',
        borderRadius: '25%'
    },
    unlimitedHeader: {
        fontSize: '50%',
        fontWeight: 'bold',
        color: 'white',
        margin: 0,
        padding: 0,
        textAlign: 'center',
        marginTop: '10%'
    }
});

export default styles;
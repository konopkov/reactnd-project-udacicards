import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {purple, white} from '../utils/colors'
import Deck from './Deck'


class DeckView extends Component {

    static navigationOptions = ({navigation}) => {
        const {deckId} = navigation.state.params;

        return {
            title: deckId
        }
    };

    render() {
        const {decks} = this.props;
        const {deckId} = this.props.navigation.state.params;

        return (
            <View>
                <Deck title={decks[deckId].title} cardsNo={decks[deckId].questions.length}/>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                    onPress={() => this.props.navigation.navigate(
                        'NewCard',
                        {deckId: deckId}
                    )}>
                    <Text style={[styles.submitBtnText]}>Add Card</Text>
                </TouchableOpacity>
                {decks[deckId].questions.length > 0 &&
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                    onPress={() => this.props.navigation.navigate(
                        'QuizView',
                        {deckId: deckId}
                    )}>
                    <Text style={[styles.submitBtnText]}>Start Quiz</Text>
                </TouchableOpacity>}
            </View>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        decks: state.decks
    }
};

export default connect(mapStateToProps)(DeckView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    submitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    text: {
        color: purple,
        fontSize: 56,
        textAlign: 'center',
    },
});
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {black, purple, white} from '../utils/colors'
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
                    style={styles.addBtn}
                    onPress={() => this.props.navigation.navigate(
                        'NewCard',
                        {deckId: deckId}
                    )}>
                    <Text style={[styles.addBtnText]}>Add Card</Text>
                </TouchableOpacity>

                {decks[deckId].questions.length > 0 &&
                <TouchableOpacity
                    style={styles.quizBtn}
                    onPress={() => this.props.navigation.navigate(
                        'QuizView',
                        {deckId: deckId}
                    )}>
                    <Text style={[styles.quizBtnText]}>Start Quiz</Text>
                </TouchableOpacity>
                }
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
    addBtn: {
        backgroundColor: white,
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin: 5,
        marginLeft: 100,
        marginRight: 100,
        borderColor: black,
        borderWidth: 2,
    },
    addBtnText: {
        color: black,
        fontSize: 22,
        textAlign: 'center'
    },
    quizBtn: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin: 5,
        marginLeft: 100,
        marginRight: 100
    },
    quizBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    text: {
        color: black,
        fontSize: 56,
        textAlign: 'center',
    },
});

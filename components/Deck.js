import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'
import {black, gray, white} from '../utils/colors'


class Deck extends Component {

    render() {
        const {title, cardsNo} = this.props;

        return (
            <View style={styles.deck}>
                <Text style={styles.deckTitle}>
                    {title}
                </Text>
                <Text style={styles.numberOfCards}>
                    {cardsNo} {cardsNo === 1 ? 'card' : 'cards'}
                </Text>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        decks: state.decks
    }
};

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
    deck: {
        backgroundColor: white,
        borderRadius: 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: gray,
        borderWidth: 1
    },
    deckTitle: {
        color: black,
        fontSize: 26,
        textAlign: 'center',
    },
    numberOfCards: {
        color: gray,
        fontSize: 18,
        textAlign: 'center',
    }
});
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {white} from '../utils/colors'
import Deck from './Deck'


class DeckView extends Component {

    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params;

        return {
            title: entryId
        }
    };

    render() {
        const {decks} = this.props;
        const {entryId} = this.props.navigation.state.params;

        return (
            <View>
                <Deck title={decks[entryId].title} cardsNo={decks[entryId].questions.length}/>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'NewCard',
                    {entryId: entryId}
                )}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'DeckView',
                    {entryId: entryId}
                )}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
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

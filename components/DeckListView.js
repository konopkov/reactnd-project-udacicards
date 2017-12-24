import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, FlatList, TouchableOpacity} from 'react-native'
import {receiveDecks} from '../actions/index'
import {getDecks} from '../utils/storage'
import {AppLoading} from 'expo'
import Deck from './Deck'
import DeckView from './DeckView'


class DeckListView extends Component {

    state = {
        ready: false,
        text: ''
    };

    componentDidMount() {
        const {dispatch} = this.props;
        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(this.setState(() => ({
                ready: true
            })))

    }

    render() {
        const {decks} = this.props;
        const {ready} = this.state;

        console.log(decks);

        if (ready === false) {
            return <AppLoading/>
        }
        return (
            <View>
                {decks && <FlatList
                    data={Object.keys(decks)}
                    renderItem={
                        ({item}) =>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                'DeckView',
                                {entryId: item}
                            )}>
                                <Deck title={decks[item].title} cardsNo={decks[item].questions.length}/>
                            </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index}
                />}
            </View>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        decks: state.decks
    }
};

export default connect(mapStateToProps)(DeckListView)

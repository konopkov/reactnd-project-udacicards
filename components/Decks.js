import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, FlatList} from 'react-native'
import {receiveDecks} from '../actions/index'
import {getDecks} from '../utils/storage'
import {AppLoading} from 'expo'
import Deck from './Deck'


class Decks extends Component {

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
                    renderItem={({item}) => <Deck title={decks[item].title} cardsNo={decks[item].questions.length}/>}
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

export default connect(mapStateToProps)(Decks)
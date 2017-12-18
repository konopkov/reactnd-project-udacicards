import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Platform} from 'react-native'
import {white} from '../utils/colors'


class Deck extends Component {

    render() {
        const {title, cardsNo} = this.props;

        console.log(title);

        return (
            <View style={styles.item}>
                <Text>
                    {title}
                </Text>
                <Text>
                    {cardsNo} cards
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
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    }

});
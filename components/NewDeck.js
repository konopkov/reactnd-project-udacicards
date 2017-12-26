import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {white, black} from '../utils/colors'
import {saveDeckTitle} from '../utils/storage'
import {addDeck} from "../actions";


const SubmitBtn = ({onPress}) => {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
            onPress={onPress}>
            <Text style={[styles.submitBtnText]}>Submit</Text>
        </TouchableOpacity>
    )
};

class NewDeck extends Component {

    state = {
        deckTitle: ''
    };

    handleSubmit = () => {
        const {deckTitle} = this.state;
        const {dispatch, navigation} = this.props;

        if (!deckTitle) {
            return Alert.alert('Blank entry', 'Please enter deck title.')
        }

        dispatch(addDeck(deckTitle));
        saveDeckTitle(deckTitle);

        this.setState({
            deckTitle: ''
        });

        navigation.navigate('DeckView', { deckId: deckTitle});
    };

    render() {
        return (
            <View>
                <Text style={styles.text}>What is the title of your new deck?</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(deckTitle) => this.setState({deckTitle})}
                    value={this.state.deckTitle}
                />
                <SubmitBtn
                    onPress={this.handleSubmit}
                />
            </View>

        )
    }
}

export default connect()(NewDeck)

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        margin: 20,
        borderRadius: 5
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    submitBtn: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 100,
        marginRight: 100
    },
    submitBtnText: {
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

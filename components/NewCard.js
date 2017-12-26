import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import {white, black} from '../utils/colors'
import {addCardToDeck} from '../utils/storage'
import {addCard} from '../actions'


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
        question: '',
        answer: ''
    };

    handleSubmit = () => {
        const {question, answer} = this.state;
        const card = {question, answer};
        const {dispatch} = this.props;
        const {deckId} = this.props.navigation.state.params;
        const {navigation} = this.props;

        if (!question) {
            return Alert.alert('Blank entry', 'Please enter card question.')
        }
        if (!answer) {
            return Alert.alert('Blank entry', 'Please enter card answer.')
        }

        dispatch(addCard(deckId, card));
        addCardToDeck(deckId, card);

        this.setState({
            question: '',
            answer: ''
        });

        navigation.goBack()
    };

    render() {

        return (
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
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

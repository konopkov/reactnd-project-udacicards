import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TextInput, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {white, purple} from '../utils/colors'
import {addCardToDeck} from '../utils/storage'


const SubmitBtn = ({onPress}) => {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={[styles.submitBtnText]}>SUBMIT</Text>
        </TouchableOpacity>
    )
};

class NewDeck extends Component {

    state = {
        question: '',
        answer: ''
    };

    render() {

        const {entryId} = this.props.navigation.state.params;

        return (
            <View>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                />
                <SubmitBtn
                    onPress={() => {
                        addCardToDeck(entryId, {question: this.state.question, answer: this.state.answer})
                    }}
                />
            </View>

        )
    }
}

export default connect()(NewDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    iosSubmitBtn: {
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
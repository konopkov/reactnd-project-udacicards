import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, TextInput, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {white, purple} from '../utils/colors'
import {saveDeckTitle} from '../utils/storage'


const SubmitBtn = ({onPress}) => {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={[styles.submitBtnText]}>SUBMIT</Text>
        </TouchableOpacity>
    )
};

class NewDeck extends Component {

    state = {
        text: ''
    };

    render() {
        return (
            <View>
                <Text style={styles.text}>What is the title of your new deck?</Text>

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <SubmitBtn
                    onPress={() => {
                        saveDeckTitle(this.state.text)
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
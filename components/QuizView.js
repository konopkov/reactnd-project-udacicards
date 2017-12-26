import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import {purple, white} from '../utils/colors'


class QuizView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: 0,
            correctCount: 0,
            isQuestionDisplayed: true,
            isScoreDisplayed: false
        }
    }

    nextQuestion = (isCorrect = false) => {
        const {decks} = this.props;
        const {deckId} = this.props.navigation.state.params;

        this.setState((state) => ({
                currentQuestion: state.currentQuestion + 1,
                isQuestionDisplayed: !state.isQuestionDisplayed,
                correctCount: isCorrect
                    ? state.correctCount + 1
                    : state.correctCount,
                isScoreDisplayed: state.currentQuestion + 1 >= decks[deckId].questions.length
            })
        )
    };

    flipCard = () => {
        this.setState((state) => ({
                isQuestionDisplayed: !state.isQuestionDisplayed
            })
        )
    };


    render() {
        const {decks} = this.props;
        const {currentQuestion, isQuestionDisplayed, isScoreDisplayed, correctCount} = this.state;
        const {deckId} = this.props.navigation.state.params;

        return (


            <View>
                {!isScoreDisplayed && <View>
                    <Text>{currentQuestion + 1}/{decks[deckId].questions.length}</Text>
                    <Text>
                        {isQuestionDisplayed
                            ? decks[deckId].questions[currentQuestion].question
                            : decks[deckId].questions[currentQuestion].answer
                        }
                    </Text>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                        onPress={() => this.flipCard()}
                    >
                        <Text style={[styles.submitBtnText]}>
                            {isQuestionDisplayed
                                ? 'Answer'
                                : 'Question'
                            }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                        onPress={() => this.nextQuestion(true)}
                    >
                        <Text style={[styles.submitBtnText]}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                        onPress={() => this.nextQuestion(false)}
                    >
                        <Text style={[styles.submitBtnText]}>Incorrect</Text>
                    </TouchableOpacity>

                </View>
                }
                {isScoreDisplayed && <View>
                    <Text>
                        You answered {correctCount} questions correctly
                        from {decks[deckId].questions.length} questions
                    </Text>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.submitBtn : styles.androidSubmitBtn}
                        onPress={() => this.props.navigation.navigate(
                            'Decks'
                        )}>
                        <Text style={[styles.submitBtnText]}>Back to decks</Text>
                    </TouchableOpacity>
                </View>

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

export default connect(mapStateToProps)(QuizView)

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

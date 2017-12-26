import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {black, green, white, red, gray} from '../utils/colors'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'


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

    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification)
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
                    <Text style={styles.progressText}>
                        {currentQuestion + 1}/{decks[deckId].questions.length}
                    </Text>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>
                            {isQuestionDisplayed
                                ? decks[deckId].questions[currentQuestion].question
                                : decks[deckId].questions[currentQuestion].answer
                            }
                        </Text>
                        <TouchableOpacity
                            style={styles.flipBtn}
                            onPress={() => this.flipCard()}
                        >
                            <Text style={styles.flipBtnText}>
                                {isQuestionDisplayed
                                    ? 'Show Answer'
                                    : 'Show Question'
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.correctBtn}
                        onPress={() => this.nextQuestion(true)}
                    >
                        <Text style={styles.correctBtnText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.incorrectBtn}
                        onPress={() => this.nextQuestion(false)}
                    >
                        <Text style={styles.incorrectBtnText}>Incorrect</Text>
                    </TouchableOpacity>

                </View>
                }
                {isScoreDisplayed && <View>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>
                            You answered {correctCount}/{decks[deckId].questions.length} questions correctly
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text style={styles.backBtnText}>Back to deck</Text>
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
    card: {
        backgroundColor: white,
        borderRadius: 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: gray,
        borderWidth: 1,
        height: 200
    },
    progressText: {
        color: black,
        marginLeft: 10,
        fontSize: 26,
        textAlign: 'left',
    },
    cardText: {
        color: black,
        fontSize: 32,
        textAlign: 'center',
    },
    flipBtn: {
        padding: 10,
        height: 45,
        margin: 5,
        marginLeft: 100,
        marginRight: 100,
    },
    flipBtnText: {
        color: red,
        fontSize: 22,
        textAlign: 'center'
    },
    correctBtn: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin: 5,
        marginLeft: 100,
        marginRight: 100
    },
    correctBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    incorrectBtn: {
        backgroundColor: red,
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin: 5,
        marginLeft: 100,
        marginRight: 100
    },
    incorrectBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    backBtn: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin: 5,
        marginLeft: 100,
        marginRight: 100,
        borderColor: black,
        borderWidth: 2,
    },
    backBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
});

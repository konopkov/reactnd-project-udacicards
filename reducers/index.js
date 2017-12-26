import {RECEIVE_DECKS, ADD_CARD, ADD_DECK} from '../actions/index'

const decks = (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                decks: action.decks
            };

        case ADD_CARD:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        ...state[action.title],
                        title: action.title,
                        questions: [...state.decks[action.title].questions, action.card]
                    }
                }
            };

        case ADD_DECK:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.title]: {
                        title: action.title,
                        questions: []
                    }
                }
            };

        default:
            return state
    }
};

export default decks

import {RECEIVE_DECKS, ADD_CARD} from '../actions/index'

const decks = (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                decks: action.decks
            };

        case ADD_CARD:
            console.log('ADD_CARD');
            console.log(action);
            return {
                ...state,
                decks: {...state.decks,
                    [action.title]: {
                        ...state[action.title],
                        title: action.title,
                        questions: [...state.decks[action.title].questions, action.card]
                    }}
            };

        default:
            return state
    }
};

export default decks

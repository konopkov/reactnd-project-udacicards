import {RECEIVE_DECKS} from '../actions/index'

const decks = (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                decks: action.decks
            };

        default:
            return state
    }
};

export default decks

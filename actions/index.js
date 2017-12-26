export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';

export const receiveDecks = (decks) => {
    return {
        type: RECEIVE_DECKS,
        decks
    }
};

export const addCard = (title, card) => {
    return {
        type: ADD_CARD,
        title,
        card
    }
};
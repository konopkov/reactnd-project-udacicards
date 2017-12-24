import {AsyncStorage} from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

// getDecks: return all of the decks along with their titles, questions, and answers.
export const getDecks = () => {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(data => JSON.parse(data))

};

// getDeck: take in a single id argument and return the deck associated with that id.
export const getDeck = (id) => {
    return getDecks()
        .then((data) => data[id])

};

// saveDeckTitle: take in a single title argument and add it to the decks.
export const saveDeckTitle = (title) => {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))

};

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck
// with the associated title.
export const addCardToDeck = (title, card) => {
    getDeck(title).then((deck) => {
        return AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [deck.title]: {
                    questions: deck.questions.concat(card)
                }
            })
        )
    })

};

# UdaciCards Project

Assessment project for Udacity's React Native course.

## TL;DR

To get started developing right away:

* install all project dependencies with `yarn install`
* start the development server with `yarn start`
* follow up QR code with Expo app, or press i/a to run app in iOS/Android simulator

## Tested on

* iOS simulator - v10.0
* Android Simulator - Pixel XL API 27
* Apple iPhone 6 Plus - iOS 11.2
* Nextbit Robin - Android 7.1.1

## Project structure
```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── App.js # This is the root of the app, mainly for navigation scheme.
├── App.test.js # Test case for rendering app without crashing.
├── actions
│   └── index.js # redux actions for decks
├── components
│   ├── Deck.js # Deck component to show on DeckList View
│   ├── DeckListView.js # Main app screen - list of decks
│   ├── DeckLView.js # Individual Deck View
│   ├── NewCard.js # Screen to allow user add a new card to deck
│   ├── NewDeck.js # Screen to allow user add a new deck
│   └── QuizView.js # Quiz Screen
├── reducers
│   └── index.js # redux reducer for decks
└── utils
    ├── colors.js # common app colors
    ├── helpers.js # helpers file with local notifications functions
    └── storage.js # functions to work with async local storage

```
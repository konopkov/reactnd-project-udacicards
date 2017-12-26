import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation'
import {View, StatusBar} from 'react-native'
import {Constants} from 'expo'
import {createStore} from 'redux'
import DeckListView from './components/DeckListView'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import DeckView from './components/DeckView'
import QuizView from './components/QuizView'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {white, black} from './utils/colors'
import {FontAwesome, Ionicons, Entypo} from '@expo/vector-icons'
import {setLocalNotification} from './utils/helpers'


const UdaciStatusBar = ({backgroundColor, ...props}) => {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
};


const Tabs = TabNavigator({
    History: {
        screen: DeckListView,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => <Entypo name='archive' size={30} color={tintColor}/>
        }
    },
    AddEntry: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: white,
        style: {
            height: 56,
            backgroundColor: black,
            shadowRadius: 6,
            shadowOpacity: 1,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            }
        }
    }
});


const MainNavigator = StackNavigator({
    Decks: {
        screen: Tabs
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black
            }
        }
    },
    NewCard: {
        screen: NewCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black
            }
        }
    },
    QuizView: {
        screen: QuizView,
        title: 'Quiz',
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black
            }
        }
    }
});

export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={black} barStyle='light-content'/>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}

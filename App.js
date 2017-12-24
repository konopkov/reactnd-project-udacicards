import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation'
import {View, Platform, StatusBar} from 'react-native'
import {Constants} from 'expo'
import {createStore} from 'redux'
import DeckListView from './components/DeckListView'
import NewDeck from './components/NewDeck'
import NewCard from './components/NewCard'
import DeckView from './components/DeckView'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {white, purple} from './utils/colors'
import {FontAwesome, Ionicons, Entypo} from '@expo/vector-icons'


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
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
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
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'purple'
            }
        }
    },
    NewCard: {
        screen: NewCard,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'purple'
            }
        }
    }
});

export default class App extends React.Component {

    componentDidMount() {
        // setLocalNotification()
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={'purple'} barStyle='light-content'/>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}

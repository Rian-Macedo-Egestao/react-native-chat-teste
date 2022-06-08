
import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Chat } from './src/screens/Chat';


// Importing our screens


const Stack = createStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Chat" component={Chat}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

/*
  We are wrapping Home screen and Chat screen in a single stack, 
  so that we can navigate from Home to Chat screen.
*/
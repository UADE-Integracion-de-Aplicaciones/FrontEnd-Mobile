import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from '../screens/LogIn';
import Registro from '../screens/Registro';
import Home from '../screens/Home';
const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }}/>
        <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
      </Stack.Navigator>
    
  )
}

export default MainStackNavigator
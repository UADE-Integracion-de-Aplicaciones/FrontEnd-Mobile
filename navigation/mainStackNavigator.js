import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LogIn from '../screens/LogIn';
import Registro from '../screens/Registro';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogIn'>
        <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }}/>
        <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
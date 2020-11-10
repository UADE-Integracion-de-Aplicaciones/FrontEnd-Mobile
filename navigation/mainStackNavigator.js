import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import materialTheme from '../constants/Theme';
import LogIn from '../screens/LogIn';
import Registro from '../screens/Registro';
import Home from '../screens/Home';
import ResumenDeCuenta from '../screens/ResumenDeCuenta';
const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
      <Stack.Navigator initialRouteName='LogIn'>
        <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }}/>
        <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
        <Stack.Screen name='ResumenDeCuenta' component={ResumenDeCuenta} options={{
          title: 'Resumen de cuenta',
          headerStyle: {
            backgroundColor: materialTheme.COLORS.BACKGROUND,
          },
          headerTintColor: 'white',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
        }} />

      </Stack.Navigator>
    
  )
}

export default MainStackNavigator
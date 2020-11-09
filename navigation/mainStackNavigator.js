import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import materialTheme from '../constants/Theme';

import LogIn from '../screens/LogIn';
import Registro from '../screens/Registro';
import PagoServicios from '../screens/PagoServicios';

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='PagoServicios'>
        <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name='LogIn' component={LogIn} options={{ headerShown: false }}/>
        <Stack.Screen name='PagoServicios' component={PagoServicios} options={{
          title: 'Pago de Servicios',
          headerStyle: {
            backgroundColor: materialTheme.COLORS.BACKGROUND,
          },
          headerTintColor: 'white',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
        }} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
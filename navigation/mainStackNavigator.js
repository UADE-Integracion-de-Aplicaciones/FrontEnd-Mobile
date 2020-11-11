import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import materialTheme from '../constants/Theme';
import LogIn from '../screens/LogIn';
import Registro from '../screens/Registro';
import Home from '../screens/Home';
import ResumenDeCuenta from '../screens/ResumenDeCuenta';
import Perfil from '../screens/Perfil';
import PagoServicios from '../screens/PagoServicios';
import OlvideContrasena from '../screens/OlvideContrasena';
import CodigoCambioContrasena from '../screens/IngresoCodigoCambioContrasena';
import CambiarContrasena from '../screens/CambiarContrasena';
import ContrasenaNuevaConfirmada from '../screens/ContrasenaNuevaConfirmada';
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
        <Stack.Screen name='Perfil' component={Perfil} options={{
          title: 'Perfil',
          headerStyle: {
            backgroundColor: materialTheme.COLORS.BACKGROUND,
          },
          headerTintColor: 'white',
        }} />
        <Stack.Screen name='PagoServicios' component={PagoServicios} options={{
          title: 'Pago de Servicios',
          headerStyle: {
            backgroundColor: materialTheme.COLORS.BACKGROUND,
          },
          headerTintColor: 'white',
        }} />
        <Stack.Screen name='OlvideContrasena' component={OlvideContrasena} options={{
          title: 'Recupero de Contraseña',
          headerStyle: {
            backgroundColor: materialTheme.COLORS.BACKGROUND,
          },
          headerTintColor: 'white',
        }} />
        <Stack.Screen name='CodigoCambioContrasena' component={CodigoCambioContrasena} options={{
          title: 'Validar Código',
          headerStyle: {
            backgroundColor: materialTheme.COLORS.BACKGROUND,
          },
          headerTintColor: 'white',
        }} />
        <Stack.Screen name='CambiarContrasena' component={CambiarContrasena} options={{
          title: 'Cambiar Contraseña',
          headerStyle: {
            backgroundColor: materialTheme.COLORS.BACKGROUND,
          },
          headerTintColor: 'white',
        }} />
        <Stack.Screen name='ContrasenaNuevaConfirmada' component={ContrasenaNuevaConfirmada} options={{
          title: 'Exito!',
          headerStyle: {
            backgroundColor: materialTheme.COLORS.BACKGROUND,
          },
          headerTintColor: 'white',
        }} />
      </Stack.Navigator>
    
  )
}

export default MainStackNavigator
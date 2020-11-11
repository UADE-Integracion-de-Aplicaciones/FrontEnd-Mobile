import React , {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Button,
  Dimensions,
  ImageBackground,
  Keyboard,
  ScrollView,
TouchableOpacity,
  Image,
} from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import materialTheme from '../constants/Theme';

const { height, width } = Dimensions.get('screen');
import Check from '../assets/icons/checked.png';


function ContrasenaNuevaConfirmada(props){
    const {navigation}=props;
    return (
        <View>
            <View style={styles.olvidarContainer}>
                <Image source={Check} style={{ width: 120, height: 120, alignSelf:"center", top:"15%" }} />
                <Text style={{ left:"5%",top:"25%"}} >
                El cambio de contraseña se ha realizado correctamente.
                </Text>
                <TouchableOpacity                 
                onPress={() => navigation.navigate("LogIn")}
                style={{...styles.button}}>
                    <Text style={{alignSelf:"center", color:"white"}}>Ir a Inicio de Sesión</Text>
                </TouchableOpacity>                   
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "90%",
        height: "10%",
        backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
        borderRadius:10,
        shadowRadius: 0,
        shadowOpacity: 0,
        top:"35%",
        justifyContent:"center",
        
    },
    olvidarContainer: {
        width: '80%',
        height:"80%",
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        top:"20%",
        alignSelf:"center",
    },
  
})

export default ContrasenaNuevaConfirmada


// sevicio
// genera el codigo y se lo manda al usuario por mail
// ingresar codigo
// valido el codigo
// ingreso contrasena y confirmacion de contrasena
// boton confirmar
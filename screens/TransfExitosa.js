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


function TransfExitosa(props){
    const {navigation}=props;
    return (
        <View>
            <View style={styles.olvidarContainer}>
                <View style={{top:'10%', justifyContent:"center", width:"90%"}}>
                    <Image source={Check} style={{ width: 120, height: 120, alignSelf:"center", top:"15%" }} />
                    <Text style={{ left:"5%",top:"25%"}} >
                    La transacción se ha realizado con exito.
                    </Text>
                </View>
                <View style={{top:"25%", height:"35%", width:width}}>
                    <TouchableOpacity                 
                    onPress={() => navigation.navigate("Home")}
                    style={{...styles.button}}>
                        <Text style={{ alignSelf:"center",color:"white", }}>Ir a Inicio</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity                 
                    onPress={() => navigation.navigate("Transferencias")}
                    style={{...styles.button}}>
                        <Text style={{alignSelf:"center", color:"white"}}>Realizar nueva Transf./Deposito</Text>
                    </TouchableOpacity> 
                </View>
                  
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "60%",
        height: "30%",
        backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
        borderRadius:10,
        shadowRadius: 0,
        shadowOpacity: 0,
        // top:"35%",
        justifyContent:"center",
        // alignItems:"center",
        alignSelf:"center",
        // alignContent:"center",
        margin:10,
        
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

export default TransfExitosa


// sevicio
// genera el codigo y se lo manda al usuario por mail
// ingresar codigo
// valido el codigo
// ingreso contrasena y confirmacion de contrasena
// boton confirmar
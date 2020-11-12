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
import { Formik, Field } from 'formik';
import { Block, theme, Text } from 'galio-framework';
import materialTheme from '../constants/Theme';
const { height, width } = Dimensions.get('screen');
import Logo from '../assets/images/LogoBankMe.png';
import { Avatar } from "react-native-elements";
import Usuario from '../assets/icons/usuario.png';

function Perfil({route,navigation}){
    // const {navigation}=props;
    const [nombreUsuario, setNombreUsuario] = useState("Micaela Esquerdo"); //para definir el nombre del usuario desde la bd
    const {idUsuario}=route.params;
    console.log(idUsuario);
    return (
        <View>
            <Image source={Usuario} style={{ width: 120, height: 120, alignSelf:"center", top:"15%" }} />
            <View style={{backgroundColor:"white", top:"30%", height:"50%", width:"90%", left:'5%'}}>
                <View>
                    <View style={{backgroundColor:materialTheme.COLORS.BACKGROUND, top:"10%", width:"90%", alignSelf:"center", borderRadius:7}}>
                        <Text color="white" size={25} style={{padding:"2%",}}>Nombre</Text>

                    </View>
                    <Text color="black" size={20} style={{padding:"8%"}}>{nombreUsuario}</Text>
                </View>
                <TouchableOpacity                 
                      onPress={() => navigation.navigate("LogIn")}
                      style={{...styles.button, alignSelf:"center", justifyContent:"center"}}>
                        <Text  size={20} style={{alignSelf:"center", color:"white"}}>Cerrar Sesión </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "90%",
        height: "20%",
        backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
        borderRadius:5,
        shadowRadius: 0,
        shadowOpacity: 0,
        top:"7%"
    },
})

export default Perfil
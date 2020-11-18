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
import CustomInput from '../screens/componenteRegistro/CustomInput';

const { height, width } = Dimensions.get('screen');
import Logo from '../assets/images/LogoBankMe.png';
import { Avatar } from "react-native-elements";
import Usuario from '../assets/icons/usuario.png';
import axios from 'axios';

import * as yup from 'yup';

function OlvideContrasena(props){
    const {navigation}=props;
    const olvidarValidationSchema = yup.object().shape({
        dni: yup
        .number()
        .typeError('Solo se permiten números')
        .required('El DNI es obligatorio'),
        nombreusuario:yup
        .string()
        .required('El nombre de usuario es obligatorio'),
      }) 

      const postDataUsingSimplePostCall = (dni,nombreusuario) => {
        var data = {
          "dni": dni,
        };
        console.log(dni, nombreusuario);
        axios
          .post('https://integracion-banco.herokuapp.com/olvide_mi_clave',data )
          .then(res => {
            navigation.navigate("CodigoCambioContrasena",{dni,nombreusuario});
          })
          .catch(function (error) {
            console.log(error);
          });
          
      };
    return (
        <ScrollView onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Block flex style={{ width:width, height:height, top:"10%"}}>

                    <View style={styles.signupContainer}>
                        <Formik
                            validationSchema={olvidarValidationSchema}
                            initialValues={{ dni: '', nombreusuario:''}}
                            onSubmit={values => postDataUsingSimplePostCall(values.dni, values.nombreusuario)}

                        >
                            {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            isValid,
                            }) => (
                            <>
                                <Text
                                style={{marginLeft:'5%', top:"5%"}}
                                >
                                Ingrese el DNI y nombre de usuario asociado a su cuenta:
                                </Text>
                                <View style={{width:"80%", alignItems:"center", top:"10%"}}>
                                    <Field
                                        component={CustomInput}
                                        name="dni"
                                        placeholder="  DNI"
                                        keyboardType="default"
                                        value={values.dni}
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="nombreusuario"
                                        placeholder="  Nombre de usuario"
                                        keyboardType="default"
                                        value={values.nombreusuario}
                                    />
                                    <TouchableOpacity                 
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                    style={{...styles.button}}>
                                        <Text style={{alignSelf:"center", color:"white"}}>Continuar </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            )}
                        </Formik>
                    </View>
                </Block>
            </SafeAreaView>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupContainer: {
        width: '80%',
        height:"50%",
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        alignSelf:"center",
        backgroundColor: 'white',

    },
    button: {
        width: width - theme.SIZES.BASE * 15,
        height: theme.SIZES.BASE * 2,
        backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
        borderRadius:5,
        shadowRadius: 0,
        shadowOpacity: 0,
        top:"15%",
        alignSelf:"center",
        justifyContent:"center"
    },
  
})

export default OlvideContrasena



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
import * as yup from 'yup';


function CodigoCambioContrasena({route,props, navigation}){
    const {dni,nombreusuario}=route.params;
    const dniusuario=dni;
    const nusuario=nombreusuario;
    const codigoValidationSchema = yup.object().shape({
        codigo: yup
        .string()
        .required('El código es obligatorio'),
      }) 

    const pasarALaOtraPantalla = (codigo) =>{
        navigation.navigate("CambiarContrasena", {dniusuario,nusuario,codigo})
    };
    return (
        <ScrollView onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Block flex style={{ width:width, height:height, top:"10%"}}>

                    <View style={styles.signupContainer}>
                        <Formik
                            validationSchema={codigoValidationSchema}
                            initialValues={{ codigo: ''}}
                            
                            onSubmit={values => pasarALaOtraPantalla(values.codigo)}
                            
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
                                style={{left:"2%", top:"5%"}}
                                >
                                Ingrese el código de validación que fue enviado a su e-mail:
                                </Text>
                                <View style={{width:"90%", top:"10%",alignItems:"center"}}>
                                    <Field
                                        component={CustomInput}
                                        name="codigo"
                                        placeholder="  Código de validación"
                                        keyboardType="default"
                                        value={values.codigo}
                                    />
                                    <TouchableOpacity                 
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                    style={{...styles.button}}>
                                        <Text style={{alignSelf:"center", color:"white"}}>Validar </Text>
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
        height:"30%",
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

export default CodigoCambioContrasena

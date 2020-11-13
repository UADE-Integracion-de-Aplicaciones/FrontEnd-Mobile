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


function Transferencias(props){
    const {navigation}=props;
    const codigoValidationSchema = yup.object().shape({
        codigo: yup
        .string()
        // .typeError('Solo se permiten números')
        .required('El código es obligatorio'),
      }) 
    return (
        <ScrollView onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Block flex style={{ width:width, height:height, top:"10%"}}>

                    <View style={styles.signupContainer}>
                        <Formik
                            validationSchema={codigoValidationSchema}
                            initialValues={{ codigo: ''}}
                            onSubmit={() => navigation.navigate("CambiarContrasena")}
                            
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
                                // onPress={() => navigation.navigate("OlvideContrasena")}
                                >
                                CAMBIAR
                                </Text>
                                <View style={{width:"90%", top:"10%",alignItems:"center"}}>
                                    <Field
                                        component={CustomInput}
                                        name="codigo"
                                        placeholder="  CAMBIAR"
                                        keyboardType="default"
                                        value={values.codigo}
                                    />
                                    <TouchableOpacity                 
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                    style={{...styles.button}}>
                                        <Text style={{alignSelf:"center", color:"white"}}>CAMBIAR </Text>
                                    </TouchableOpacity>
                                    {/* tomo el codigo y comparo con el codigo en la bd con el id del usuario */}
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
        // top:"0%",
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

export default Transferencias


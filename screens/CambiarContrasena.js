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
import * as yup from 'yup';


export default function CambiarContrasena(props){
    const {navigation}=props;
    const [preg1,setpreg1]=useState("Nombre de primer mascota");
    const [preg2,setpreg2]=useState("Donde nacio");
    const [preg3,setpreg3]=useState("Pelicula favorita");


    const contrasenaNuevaValidationSchema = yup.object().shape({
        contrasenanueva: yup
        .string()
        .matches(/\w*[a-z]\w*/,  "La contraseña debe tener al menos 1 minúscula")
        .matches(/\w*[A-Z]\w*/,  "La contraseña debe tener al menos 1 mayúscula")
        .matches(/\d/, "La contraseña debe tener al menos 1 número")
        .matches(/[#$%*_=+]/, "La contraseña debe tener al menos 1 símbolo (# $ % * _ = +)")
        .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
        .required('La contraseña es obligatoria'),
        confirmcontrasenanueva: yup
        .string()
        .oneOf([yup.ref('contrasenanueva')], 'Las contraseñas no coinciden')
        .required('La confirmación de contraseña es obligatoria'),
      }) 
    return (
        <ScrollView onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Block flex style={{ width:width, height:height, top:"10%"}}>

                    <View style={styles.signupContainer}>
                        <Formik
                        validationSchema={contrasenaNuevaValidationSchema}
                        initialValues={{
                           resp1:'',
                           resp2:'',
                           resp3:'',
                           contrasenanueva:'',
                           confirmcontrasenanueva:'',


                        }}
                        onSubmit={() => navigation.navigate("LogIn")}
                        >
                        {({ handleSubmit, isValid, errors, values, touched }) => (
                            <>
                            <Text
                            style={{marginLeft:'-40%'}}
                            size={17}
                            // onPress={() => navigation.navigate("OlvideContrasena")}
                            >
                            Preguntas de seguridad:                
                            </Text>
                            {/* <View style={{top:"5%"}}> */}
                            <Text></Text>
                            <Text
                            style={{left:'-15%'}}
                            // size={17}
                            // onPress={() => navigation.navigate("OlvideContrasena")}
                            >
                            1. {preg1}               
                            </Text>
                            <Field
                                component={CustomInput}
                                name="resp1"
                                placeholder="  Respuesta"
                                value={values.resp1}

                            />
                            {/* </View> */}
                            <Text
                            style={{marginLeft:"-65%"}}
                            // size={17}
                            // onPress={() => navigation.navigate("OlvideContrasena")}
                            >
                            2. {preg2}               
                            </Text>
                            <Field
                                component={CustomInput}
                                name="resp2"
                                placeholder="  Respuesta"
                                value={values.resp2}

                                keyboardType="default"
                            />
                            <Text
                            style={{left:'-28%'}}
                            // size={17}
                            // onPress={() => navigation.navigate("OlvideContrasena")}
                            >
                            3. {preg3}               
                            </Text>
                            <Field
                                component={CustomInput}
                                name="resp3"
                                placeholder="  Respuesta"
                                value={values.resp3}

                                keyboardType="default"
                            />
                            
                            <Text
                            style={{left:'-15%'}}
                            size={17}
                            // onPress={() => navigation.navigate("OlvideContrasena")}
                            >
                            Ingrese la contraseña nueva:               
                            </Text>
                            <Text size={10} style={{ width:"90%", color:materialTheme.COLORS.BUTTON_COLOR, top:"0%"}}>Nota: la contraseña debe contener 8 caracteres mínimo. Al menos 1 minúscula, 1 mayúscula, 1 número y 1 símbolo {"("}# $ % * _ = +{")"}  </Text>

                            <View style={{width:"90%", alignContent:"center", alignItems:"center"}}>    

                                <Field
                                    component={CustomInput}
                                    name="contrasenanueva"
                                    placeholder="  Contraseña nueva"
                                    value={values.contrasenanueva}

                                    secureTextEntry
                                />
                                <Field
                                    component={CustomInput}
                                    name="confirmcontrasenanueva"
                                    placeholder="  Confirmar Contraseña"
                                    value={values.confirmcontrasenanueva}

                                    secureTextEntry
                                />

                                <TouchableOpacity                 
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                    style={{...styles.button, justifyContent:"center"}}>
                                        <Text style={{alignSelf:"center", color:"white"}}>Registrarse</Text>
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
        width: '90%',
        height:"80%",
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        top:"-5%",
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
        alignSelf:"center"
    },
    loginContainer: {
        width: '80%',
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        backgroundColor: '#ffbd59',
        top:"-28%",
        marginLeft:"10%"
    },
    opciones:{
        color: materialTheme.COLORS.BUTTON_COLOR, 
        textDecorationLine: 'underline',
    }
})

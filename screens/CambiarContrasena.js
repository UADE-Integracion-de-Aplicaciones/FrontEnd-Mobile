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


function CambiarContrasena(props){
    const {navigation}=props;
    const contrasenaNuevaValidationSchema = yup.object().shape({
        contrasenanueva: yup
          .string()
          .matches(/\w*[a-z]\w*/,  "La contraseña debe tener al menos 1 minúscula")
          .matches(/\w*[A-Z]\w*/,  "La contraseña debe tener al menos 1 mayúscula")
          .matches(/\d/, "La contraseña debe tener al menos 1 número")
          .matches(/[#$%*_=+]/, "La contraseña debe tener al menos 1 símbolo (# $ % * _ = +)")
          .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
          .required('La contraseña es obligatoria'),
          confirmacionCN: yup
          .string()
          .oneOf([yup.ref('contrasenanueva')], 'Las contraseñas no coinciden')
          .required('La confirmación de contraseña es obligatoria'),
      }) 
    return (
        <View onPress={Keyboard.dismiss}>
            <Text
            style={{left:"5%", top:"15%"}}
            onPress={() => navigation.navigate("OlvideContrasena")}
            >
            Ingrese la contraseña nueva:
            </Text>
            <View style={styles.olvidarContainer}>
                <Formik
                    validationSchema={contrasenaNuevaValidationSchema}
                    initialValues={{ contrasenanueva: '', confirmacionCN:''}}
                    onSubmit={values => console.log(values)}
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
                        <Field
                            component={CustomInput}
                            name="contrasenanueva"
                            placeholder="  Contraseña nueva"
                            keyboardType="default"
                            value={values.contrasenanueva}
                            secureTextEntry
                        />
                        <Field
                            component={CustomInput}
                            name="confirmacionCN"
                            placeholder="  Confirmar contraseña"
                            keyboardType="default"
                            value={values.confirmacionCN}
                            secureTextEntry
                        />
                        <TouchableOpacity                 
                        onPress={() => navigation.navigate("ContrasenaNuevaConfirmada")}
                        disabled={!isValid}
                        style={{...styles.button}}>
                            <Text style={{alignSelf:"center", color:"white"}}>Confirmar </Text>
                        </TouchableOpacity>
                        {/* con la confirmacion de la contrasena se la guarda en la base de datos con el id del usuario */}
                    </>
                    )}
                </Formik>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "90%",
        height: "12%",
        backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
        borderRadius:10,
        shadowRadius: 0,
        shadowOpacity: 0,
        top:"10%",
        justifyContent:"center",
        
    },
    errorText: {
        fontSize: 10,
        color: 'red',
        marginLeft:"7%",
    },
    olvidarContainer: {
        width: '80%',
        height:"70%",
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        top:"20%",
        alignSelf:"center",
    },
  
})

export default CambiarContrasena


// sevicio
// genera el codigo y se lo manda al usuario por mail
// ingresar codigo
// valido el codigo
// ingreso contrasena y confirmacion de contrasena
// boton confirmar
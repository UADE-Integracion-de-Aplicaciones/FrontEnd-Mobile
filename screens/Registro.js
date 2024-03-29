import React from 'react';
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
} from 'react-native';
import { Formik, Field } from 'formik';
import { Block, theme, Text } from 'galio-framework';
import materialTheme from '../constants/Theme';
const { height, width } = Dimensions.get('screen');
import Logo from '../assets/images/LogoBankMe.png';
import axios from 'axios';

import * as yup from 'yup';
import CustomInput from '../screens/componenteRegistro/CustomInput';

export default function Registro(props) {
    const { navigation } = props;
///// --------------- CONEXION REGISTRO ------------------
const postDataUsingSimplePostCall = (dni, usuario, contraseña, codigodeautenticacion) => {
    var data = {
      "dni": dni,
      "nombre_usuario": usuario,
      "clave" : contraseña,
      "codigo_autorizacion": codigodeautenticacion,
    };
    console.log(dni,usuario, contraseña,codigodeautenticacion);
    axios
      .post('https://integracion-banco.herokuapp.com/clientes/usuario/registrar',data )
      .then(res => {
        // handle success
        // handleUser(res);
        navigation.navigate("LogIn");
        
        // alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      // .then(function (response) {
      //   // handle success
      //   // console.log(response);
      //   navigation.navigate("Home");
      //   alert(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   // handle error
      //   // console.log(response);
      //   alert(error.message);
      // });
  };

//   const handleUser = (datos) => {
//     AsyncStorage.setItem('dni', JSON.stringify(datos.data.user.dni));
//     // var name = JSON.stringify(datos.data.user.entidad.nombre + " " + datos.data.user.entidad.apellido);
//     // name = name.replace('"','');
//     // name = name.replace('"','');
//     AsyncStorage.setItem('nombreUsuario', name);
//     var clientid = JSON.stringify(datos.data.user.entidad.id);
//     clientid = clientid.replace('"','');
//     clientid = clientid.replace('"','');
//     AsyncStorage.setItem('clave', clientid);
//     // AsyncStorage.setItem('apellido', JSON.stringify(datos.data.user.cliente.apellido));
//     AsyncStorage.setItem('codigo', JSON.stringify(datos.data.user.codigo));
//     // var token = JSON.stringify(datos.data.user["x-access-token"]);
//     // token = token.replace('"','');
//     // token = token.replace('"','');
//     // AsyncStorage.setItem('token', token);
//     // console.log(token);
//     navigation.navigate("LogIn");
//   }




///// ------------- VALIDACIONES ------------------------
    const signUpValidationSchema = yup.object().shape({
        dni: yup
          .number()
          .typeError('Solo se permiten números')
          .required('El DNI es obligatorio'),
        usuario: yup
            .string()
            .required('El usuario es obligatorio'),
        contraseña: yup
          .string()
          .matches(/\w*[a-z]\w*/,  "La contraseña debe tener al menos 1 minúscula")
          .matches(/\w*[A-Z]\w*/,  "La contraseña debe tener al menos 1 mayúscula")
          .matches(/\d/, "La contraseña debe tener al menos 1 número")
          .matches(/[#$%*_=+]/, "La contraseña debe tener al menos 1 símbolo (# $ % * _ = +)")
          .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
          .required('La contraseña es obligatoria'),
        confirmcontraseña: yup
          .string()
          .oneOf([yup.ref('contraseña')], 'Las contraseñas no coinciden')
          .required('La confirmación de contraseña es obligatoria'),
        codigodeautenticacion: yup
            .string()
            .required('El código de autenticación es obligatorio'),

      })
  return (
    <ScrollView onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Block flex style={{backgroundColor: materialTheme.COLORS.BACKGROUND, width:width, height:height}}>
                    <Block flex center>
                        <ImageBackground
                            source={Logo}
                            style={{ height: "90%", width: "90%", marginLeft: '-85%', marginTop:"12%", zIndex: 1 }}
                        />
                    </Block>
                    <Block flex space="between" style={{top:"-20%"}}>
                        <Block flex space="around" style={{ zIndex: 2 }}>
                            <Block>
                                <Text color="white" size={40} style={{padding:"10%", top:"75%"}}>Hola, Bienvenid@!</Text>
                            </Block>
                        </Block>
                    </Block>
                    <View style={styles.signupContainer}>
                        <Formik
                        validationSchema={signUpValidationSchema}
                        initialValues={{
                            dni: '',
                            usuario: '',
                            contraseña: '',
                            confirmcontraseña: '',
                            codigodeautenticacion: '',
                        }}
                        // onSubmit={values => console.log(values)}
                        onSubmit={values => postDataUsingSimplePostCall(values.dni, values.usuario,values.contraseña, values.codigodeautenticacion)}
                        >
                        {({ handleSubmit, isValid, errors, values,touched }) => (
                            <>
                            <Field
                                component={CustomInput}
                                name="dni"
                                placeholder="  DNI"
                                value={values.dni}
                                keyboardType="numeric"
                            />
                            <Field
                                component={CustomInput}
                                name="usuario"
                                placeholder="  Usuario"
                                value={values.usuario}
                                keyboardType="default"
                            />
                            <Text size={10} style={{ width:"97%", color:materialTheme.COLORS.BUTTON_COLOR}}>Nota: la contraseña debe contener 8 caracteres mínimo. Al menos 1 minúscula, 1 mayúscula, 1 número y 1 símbolo {"("}# $ % * _ = +{")"}  </Text>

                            <Field
                                component={CustomInput}
                                name="contraseña"
                                placeholder="  Contraseña"
                                value={values.contraseña}
                                keyboardType="default"
                                secureTextEntry
                            />
                            {errors.password &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }
                            <Field
                                component={CustomInput}
                                name="confirmcontraseña"
                                placeholder="  Confirmar Contraseña"
                                value={values.confirmcontraseña}
                                secureTextEntry
                            />
                            {errors.password &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }
                            <Field
                                component={CustomInput}
                                name="codigodeautenticacion"
                                placeholder="  Código de Autenticación"
                                value={values.codigodeautenticacion}
                                secureTextEntry
                            />

                            <TouchableOpacity                 
                                onPress={handleSubmit}
                                disabled={!isValid}
                                style={{...styles.button, justifyContent:"center"}}>
                                    <Text style={{alignSelf:"center", color:"white"}}>Registrarse</Text>
                            </TouchableOpacity>

                            <Text
                            style={{...styles.opciones, top: "10%"}}
                            onPress={() => navigation.navigate('LogIn')}
                            >
                            {"¿"}Ya estas registrado{"?"}
                            </Text>

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
        height:"65%",
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        top:"-5%",
        alignSelf:"center",
        backgroundColor: materialTheme.COLORS.BACKGROUND,

    },
    button: {
        width: width - theme.SIZES.BASE * 15,
        height: theme.SIZES.BASE * 2,
        backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
        borderRadius:5,
        shadowRadius: 0,
        shadowOpacity: 0,
        top:"5%",
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
    textInput: {
        height: 40,
        width: '100%',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderRadius: 10,
    },
    errorText: {
        fontSize: 10,
        color: 'red',
    },
    opciones:{
        color: materialTheme.COLORS.BUTTON_COLOR, 
        textDecorationLine: 'underline',
    }
})

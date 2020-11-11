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


function OlvideContrasena(props){
    const {navigation}=props;
    const [nombreUsuario, setNombreUsuario] = useState("Micaela Esquerdo"); //para definir el nombre del usuario desde la bd
    const olvidarValidationSchema = yup.object().shape({
        dni: yup
        .number()
        .typeError('Solo se permiten números')
        .required('El DNI es obligatorio'),
      }) 
    return (
        <View onPress={Keyboard.dismiss}>
            <Text
            style={{left:"5%", top:"15%"}}
            onPress={() => navigation.navigate("OlvideContrasena")}
            >
            Ingrese el DNI asociado a su cuenta:
            </Text>
            <View style={styles.olvidarContainer}>
                <Formik
                    validationSchema={olvidarValidationSchema}
                    initialValues={{ dni: ''}}
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
                            name="dni"
                            placeholder="  DNI"
                            keyboardType="default"
                            value={values.dni}
                        />
                        <TouchableOpacity                 
                        onPress={() => navigation.navigate("CodigoCambioContrasena")}
                        disabled={!isValid}
                        style={{...styles.button}}>
                            <Text style={{alignSelf:"center", color:"white"}}>Continuar </Text>
                        </TouchableOpacity>
                        {/* con este dni se tiene que conectar a la bd, chequear que existe*/}                 
                        {/* si todo ok, bd genera el codigo y se lo manda al usuario por mail, se abre la otra pantalla */}
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
        height: "17%",
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
        height:"60%",
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        top:"20%",
        alignSelf:"center",
    },
  
})

export default OlvideContrasena


// sevicio
// genera el codigo y se lo manda al usuario por mail
// ingresar codigo
// valido el codigo
// ingreso contrasena y confirmacion de contrasena
// boton confirmar


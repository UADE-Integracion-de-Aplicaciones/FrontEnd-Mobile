import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform , View, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import * as yup from 'yup';
import { Formik , Field } from 'formik';
import CustomInput from '../screens/componenteRegistro/CustomInput';
import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import Logo from '../assets/images/LogoBankMe.png';
import { TouchableOpacity } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class LogIn extends React.Component {
  render() {
    const { navigation } = this.props;
  // validaciones de login
    const loginValidationSchema = yup.object().shape({
      usuario: yup
      .string()
      .required('Ingresá el usuario'),
      password: yup
        .string()
        .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
        .required('Ingresá la contraseña'),
    })  
    return (
      // <TouchableWithoutFeedback  accessible={false}>

      <ScrollView onPress={Keyboard.dismiss}>
        <View>
        {/* // <KeyboardAwareScrollView style={{flex:1}}> */}
          <Block flex style={{backgroundColor: materialTheme.COLORS.BACKGROUND, width:width, height:height}} >
            {/* <StatusBar barStyle="light-content" /> */}
            <Block flex center>
              <ImageBackground
                source={Logo}
                style={{ height: "90%", width: "90%", marginLeft: '-85%', marginTop:"10%", zIndex: 1 }}
              />
            </Block>
            <Block flex space="between" style={{top:"-20%"}}>
              <Block flex space="around" style={{ zIndex: 2 }}>
                  <Block>
                    <Text color="white" size={40} style={{padding:"10%"}}>Hola, Bienvenid@!</Text>
                  </Block>
              </Block>
            </Block>
            
            <View style={styles.loginContainer}>
              <Formik
                // enableReinitialize
                validationSchema={loginValidationSchema}
                initialValues={{ usuario: '', password: '' }}
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
                    <TextInput
                      name=""
                      placeholder=""
                      style={{backgroundColor:materialTheme.COLORS.BACKGROUND, borderColor: materialTheme.COLORS.BACKGROUND}}
                    />
                    <Field
                        component={CustomInput}
                        name="usuario"
                        placeholder="  Usuario"
                        keyboardType="default"
                        value={values.usuario}
                    />
                    <Field
                        component={CustomInput}
                        name="password"
                        placeholder=" Contraseña"
                        keyboardType="default"
                        value={values.password}
                        secureTextEntry
                    />
                   
                   <TouchableOpacity                 
                      onPress={() => navigation.navigate("Home")}

                      disabled={!isValid}
                      style={{...styles.button, justifyContent:"center"}}>
                        <Text style={{alignSelf:"center", color:"white"}}>Ingresar </Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
              <View style={{top:"40%", alignItems:"center"}}>
                <Text
                  style={{...styles.opciones, top:"25%"}}
                  onPress={() => props.navigation.navigate("Registrar")}
                  //aca despues le pongo el onPress a la pag de registro
                >
                {"¿"}Olvidaste tu contraseña{"?"} 
                </Text>
                <Text
                  style={{...styles.opciones, top:"50%"}}
                  // onPress={}

                  //aca despues le pongo el onPress a la pag de registro
                >
                {"¿"}Primera vez que ingresas{"?"}
                </Text>
              </View>
            </View>
          </Block>
          </View>
          </ScrollView>
          // </TouchableWithoutFeedback>
       
    );
  }
}

const styles = StyleSheet.create({
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
    // borderWidth: StyleSheet.hairlineWidth,
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
});
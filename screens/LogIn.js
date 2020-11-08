import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, Platform , View, TextInput} from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import * as yup from 'yup';
import { Formik } from 'formik';

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import Logo from '../assets/images/LogoBankMe.png';
import { TouchableOpacity } from 'react-native';

export default class LogIn extends React.Component {
  render() {
    const { navigation } = this.props;
  // validaciones de login
    const loginValidationSchema = yup.object().shape({
      // email: yup
      //   .string()
      //   .email("Please enter valid email")
      //   .required('Email Address is Required'),
      password: yup
        .string()
        .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
        .required('Contraseña necesaria'),
    })  
    return (
      <Block flex style={{backgroundColor: materialTheme.COLORS.BACKGROUND, width:width, height:height}}>
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
        {/* <Text
            style={{color: materialTheme.COLORS.BUTTON_COLOR, textDecorationLine: 'underline', top:"80%"}}
            
            //aca despues le pongo el onPress a la pag de registro
        >
          {"¿"}No te registraste todavia{"?"}
        </Text> */}
        <View style={styles.loginContainer}>
          <Formik
            enableReinitialize
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
                  name="usuario"
                  placeholder="  Usuario"
                  style={styles.textInput}
                  onChangeText={handleChange('usuario')}
                  onBlur={handleBlur('usuario')}
                  value={values.usuario}
                  keyboardType= "default"
                />
                <TextInput
                  name="password"
                  placeholder=" Contraseña"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  keyboardType= "ascii-capable"
                  secureTextEntry
                />
                {(touched.password && errors.password ) &&
                                  <Text style={styles.errorText}>{errors.password}</Text>
                }   
                <View style={{}}>
                  <Button
                    onPress={handleSubmit}
                    color= {materialTheme.COLORS.BUTTON_COLOR}
                    title="Ingresar"
                    disabled={!isValid}
                    style={styles.button}
                  >
                    <TouchableOpacity                  onPress={handleSubmit}
                      color= {materialTheme.COLORS.BUTTON_COLOR}
                      // title="Ingresar"
                      disabled={!isValid}
                      style={styles.button}>
                        <Text>Ingresar </Text>
                    </TouchableOpacity>
                  </Button>
                </View>
              </>
            )}
          </Formik>
        <View style={{top:"30%"}}>
          <Text
            style={{color: materialTheme.COLORS.BUTTON_COLOR, textDecorationLine: 'underline', top:"25%"}}
            onPress={() => props.navigation.navigate("Registrar")}
            //aca despues le pongo el onPress a la pag de registro
          >
          {"¿"}Olvidaste tu Contraseña{"?"} 
          </Text>
          <Text
            style={{color: materialTheme.COLORS.BUTTON_COLOR, textDecorationLine: 'underline', top:"50%"}}
            // onPress={}

            //aca despues le pongo el onPress a la pag de registro
          >
          {"¿"}Primera vez que ingresas{"?"}
          </Text>
        </View>
      </View>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    
    // width: width - theme.SIZES.BASE * 3,
    // height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    backgroundColor: '#ffbd59',
    top:"-20%",
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
});
import React , {useState, useEffect} from 'react';
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
import axios from 'axios';

function LogIn ({navigation}) {
    // const { navigation } = props
    const [usuarioVA, setUsuario] = useState(""); //este valor lo mando a la bd para chequear usuario
    const [passwordVA, setPassword] = useState(""); //este valor lo mando a la bd para chequear password
    // const [showPassword, setShowPassword] = useState(false);
    // const [id, setIdUsuario]=useState("123") //la idea es pasar este valor a la pantalla de Home asi se carga el Home con los datos del usuario que ingreso

    const getDataUsingSimpleGetCall = () => {
      axios
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
          // handle success
          alert(JSON.stringify(response.data));
        })
        .catch(function (error) {
          // handle error
          alert(error.message);
        })
        .finally(function () {
          // always executed
          alert('Finally called');
        });
    };
  
    const getDataUsingAsyncAwaitGetCall = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts/1',
        );
        alert(JSON.stringify(response.data));
      } catch (error) {
        // handle error
        alert(error.message);
      }
    };
  
    const postDataUsingSimplePostCall = (usuario, password) => {
      var body = {
        "nombre_usuario": usuario,
        "clave" : password,
      }
      console.log(body);

      axios
        .post('http://localhost:8080/login', {
          body,
        })
        .then(function (response) {
          console.log(response);
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
  
    const multipleRequestsInSingleCall = () => {
      axios
        .all([
          axios
            .get('https://jsonplaceholder.typicode.com/posts/1')
            .then(function (response) {
              // handle success
              alert('Post 1 : ' + JSON.stringify(response.data));
            }),
          axios
            .get('https://jsonplaceholder.typicode.com/posts/2')
            .then(function (response) {
              // handle success
              alert('Post 2 : ' + JSON.stringify(response.data));
            }),
        ])
        .then(
          axios.spread(function (acct, perms) {
            // Both requests are now complete
            alert('Both requests are now complete');
          }),
        );
    };
  

    const loginValidationSchema = yup.object().shape({
      usuario: yup
      .string()
      .required('Ingresá el usuario'),
      password: yup
        .string()
        .min(3, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
        .required('Ingresá la contraseña'),
    })  
    // console.log(usuario,password)
    return (

      <ScrollView onPress={Keyboard.dismiss}>
        <View>
          <Block flex style={{backgroundColor: materialTheme.COLORS.BACKGROUND, width:width, height:height}} >
            <Block flex center>
              <ImageBackground
                source={Logo}
                style={{ height: "90%", width: "90%", marginLeft: '-85%', marginTop:"10%", zIndex: 1 }}
              />
            </Block>
            <Block flex space="between" style={{top:"-10%"}}>
              <Block flex space="around" style={{ zIndex: 2 }}>
                  <Block>
                    <Text color="white" size={40} style={{padding:"10%"}}>Hola, Bienvenid@!</Text>
                  </Block>
              </Block>
            </Block>
            <View style={styles.loginContainer}>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ usuario: '', password: '' }}
                // onSubmit={values => console.log(values)}
                onSubmit={values =>postDataUsingSimplePostCall(values.usuario,values.password)}
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
                        // onValueChange={(value) => setUsuario(value)}
                        // onChange={(e) => setUsuario(e.nativeEvent.text)}
                        // onChange={(value) => setUsuario(value)}
                        // usuario={value}
                        
                        
                    />
                    <Field
                        component={CustomInput}
                        name="password"
                        placeholder=" Contraseña"
                        keyboardType="default"
                        value={values.password}
                        // type={values.showPassword ? text : 'password'} 
                        // onChange={(value) => setPassword(value)}

                        secureTextEntry
                    />
                    {/* console.log(usuario,password); */}
                    <TouchableOpacity                 
                      // onPress={() => navigation.navigate('Home', {idUsuario: id})}
                      // onPress={postDataUsingSimplePostCall(usuarioVA,passwordVA)}
                      onPress={handleSubmit}
                      disabled={!isValid}
                      style={{...styles.button, justifyContent:"center"}}>
                        <Text style={{alignSelf:"center", color:"white"}}>Ingresar </Text>
                    </TouchableOpacity>
                    <Text
                      style={{...styles.opciones, top:"15%"}}
                      onPress={() => navigation.navigate("OlvideContrasena")}
                    >
                      {"¿"}Olvidaste tu contraseña{"?"} 
                    </Text>
                    <Text
                      style={{...styles.opciones, top:"20%"}}
                      onPress={() => navigation.navigate('Registro')}
                    >
                    {"¿"}Primera vez que ingresas{"?"}
                    </Text>
                  </>
                )}
              </Formik>

            </View>
          </Block>
          </View>
          </ScrollView>       
    );
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
    height:"45%",
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    backgroundColor: '#ffbd59',
    top:"-15%",
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
});

export default LogIn;
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
  Modal,
  TouchableHighlight,
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
import SelectPicker from 'react-native-form-select-picker';
import Check from '../assets/icons/checked.png';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


function Transferencias(props){
    const {navigation}=props;
    const [selected, setSelected] = useState();
    const options = ["2398473829", "532332294", "887624840"]; //cambiar para obtener los valores de la bd
    const [modalVisible, setModalVisible] = useState(false);
    const [cuentasPicker, setCuentasPicker] = useState([]); //setear las cuentas del usuario mediante consulta de bd con el id del usuario como parametro
    const [clientid, setClientId] = useState("");
    const [token, setToken] = useState("");

    const getDataUsingSimpleGetCall = async (token) => {
          
        //   await AsyncStorage.getItem('client_id').then(value =>
        //     setClientId(value)
        //  );
              // var id = {"client_id" : clientid}
          console.log(token);
          setToken(token);
            axios
            .get('https://integracion-banco.herokuapp.com/cuentas',{
              headers: {
                Authorization: 'Bearer ' + token
              }
            } )
            .then(res => {
              // console.log(res);
              var temp = [];
              for (let i = 0; i < res.data.cuentas.length; ++i) {
                console.log(res.data.cuentas[i].cbu);
                temp.push(res.data.cuentas[i].cbu);
                
              }
              setCuentasPicker(temp);
            })
            .catch(function (error) {
              // handle error
              alert(error.message);
            });
          };

          const postTransferencia = async (monto, destino) => {

            var transferenciaInfo = {
              "cbu_origen": selected,
              "cbu_destino": destino,
              "cantidad": 0
            };
            transferenciaInfo.cantidad = parseFloat(monto);
            transferenciaInfo.cantidad.toFixed(2);
            console.log(transferenciaInfo);
        
              axios
              .post('https://integracion-banco.herokuapp.com/transacciones/clientes/transferir', transferenciaInfo ,{
                headers: {
                  Authorization: 'Bearer ' + token
                }
              })
              .then(res => {
                // console.log(res);
                alert("La transferencia se ha realizado con exito");
                navigation.navigate("TransferenciaExitosa");

               
              })
              .catch(function (error) {
                // handle error
                alert(error.message);
              });
            };

          useEffect(() => {
            AsyncStorage.getItem('clientid').then(value =>
                  setClientId(value)
               );
  
               console.log(clientid);
  
            loadData();
            // setNombreUsuario(nombreUsuario.replace('"',""));
          }, []);
  
          const loadData = async () =>{
            await AsyncStorage.getItem('token').then(value =>
  
              getDataUsingSimpleGetCall(value)
          );
  
          }
  
          useEffect(() => {
            
  
            // axios
            // .get('https://integracion-banco.herokuapp.com/cuenta/getSaldo', numero, {
            //   headers: {
            //     Authorization: 'Bearer ' + token
            //   }
            // } )
            // .then(res => {
            //   // console.log(res);
            //   var temp = [];
            //   for (let i = 0; i < res.data.cuentas.length; ++i) {
            //     console.log(res.data.cuentas[i].numero_cuenta);
            //     temp.push(res.data.cuentas[i].numero_cuenta);
                
            //   }
            //   setCuentasPicker(temp);
            // })
            // .catch(function (error) {
            //   // handle error
            //   alert(error.message);
            // });
            
            // setNombreUsuario(nombreUsuario.replace('"',""));
          }, [selected]);
          

    const codigoValidationSchema = yup.object().shape({
        montotransferencia: yup
        .number()
        // .typeError('Solo se permiten números')
        .required('El monto es obligatorio'),
        destinatario: yup
        .number()
        // .typeError('Solo se permiten números')
        .required('El destinatario es obligatorio'),
     
      }) 

    const initialValues={
        montotransferencia: '', destinatario:'', selected:'', concepto:''
    }  
    return (
        <ScrollView onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Block flex style={{ width:width, height:height, top:"10%"}}>

                    <View style={styles.signupContainer}>
                        <Formik
                            validationSchema={codigoValidationSchema}
                            initialValues={{montotransferencia: '', destinatario:'', selected:''
                            }}
                            onSubmit={values => postTransferencia(values.montotransferencia, values.destinatario)}
                            // onSubmit={() => {
                            //     setModalVisible(true);
                            //   }}
                            
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
                                style={{margin:5}}
                                // onPress={() => navigation.navigate("OlvideContrasena")}
                                >
                                Ingrese el monto:
                                </Text>
                                <View style={{width:"90%", top:"0%",alignItems:"center", alignSelf:"center"}}>
                                    <Field
                                        component={CustomInput}
                                        name="montotransferencia"
                                        placeholder="  Monto"
                                        keyboardType='number-pad'
                                        value={values.montotransferencia}
                                    />
                                </View>
                                <Text
                                style={{margin:5}}
                                // onPress={() => navigation.navigate("OlvideContrasena")}
                                >
                                Ingrese el destinatario:
                                </Text>
                                <View style={{width:"90%", top:"0%",alignItems:"center", alignSelf:"center"}}>
                                    <Field
                                        component={CustomInput}
                                        name="destinatario"
                                        placeholder="  Destinatario"
                                        keyboardType='number-pad'
                                        value={values.destinatario}
                                    />
                                </View>
                                <Text
                                style={{margin:5}}
                                // onPress={() => navigation.navigate("OlvideContrasena")}
                                >
                                Seleccione la cuenta de origen:
                                </Text>
                                <SelectPicker
                                    onValueChange={(value) => {
                                        // Do anything you want with the value. 
                                        // For example, save in state.
                                        setSelected(value);
                                    }}
                                    selected={selected}
                                    placeholder="Cuenta de origen"
                                    placeholderStyle={{fontSize:15, color: "lightgrey" }}
                                    style={styles.containerSelect}
                                    doneButtonText="Listo"
                                    
                                    >
                                    {Object.values(cuentasPicker).map((val, index2) => (
                                        <SelectPicker.Item label={val} value={val} key={index2} />
                                    ))}
                        
                                </SelectPicker>
                               
                                <TouchableOpacity                 
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                    style={{...styles.button}}>
                                        <Text style={{alignSelf:"center", color:"white"}}>Confirmar</Text>
                                </TouchableOpacity>
                                    </>
                                )}
                        </Formik>
                        {/* <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image source={Check} style={{ width: 100, height: 100, alignSelf:"center", marginBottom:20 }} />

                                    <Text style={styles.modalText}>La transferencia se ha realizado con exito.</Text>

                                    <TouchableHighlight
                                    style={styles.button}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                    >
                                    <Text style={styles.textStyle}>Ok</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal> */}
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
        height:"70%",
        // alignItems: 'center',
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
        top:"5%",
        alignSelf:"center",
        justifyContent:"center"
    },
    containerSelect:{
        backgroundColor:"white",
        alignSelf:"center",
        width:"90%",
        margin:10,
        alignItems:"center",
        borderRadius:10,
        // borderColor: materialTheme.COLORS.BUTTON_COLOR,
        // borderRadius: 10,
        // elevation: 10,
        borderWidth: 0.2,
    
      },
      centeredView: {
        flex: 1,
        // height:"90%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
        backgroundColor:"rgba(1,1,1,0.5)",
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
  
})

export default Transferencias


import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import { Formik, Field, Form } from 'formik';
import { Block, theme, Text } from 'galio-framework';
import materialTheme from '../constants/Theme';
const { height, width } = Dimensions.get('screen');
import Logo from '../assets/images/LogoBankMe.png';
// import { Picker } from "@react-native-community/picker";
// import {Picker} from '@react-native-picker/picker';

import * as yup from 'yup';
import CustomInput from './componenteRegistro/CustomInput';
// import Icon from "react-native-vector-icons/Feather";
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput,
  withPickerValues
} from "react-native-formik";
import { TextField } from "react-native-material-textfield";
import { compose } from "recompose";
// import {Picker} from "@react-native-community/picker";
// import {Picker} from "@react-native-picker/picker";
import SelectPicker from 'react-native-form-select-picker';

// import Switch from "./Switch";
const options = ["2398473829", "532332294", "887624840"]; //cambiar para obtener los valores de la bd


function PagoServicios(props){
  const { navigation } = props
  const [cuenta, setCuenta] = useState("");
  const [cbucuenta, setCBUPicker] = useState([]);
  const [selected, setSelected] = useState();
  const pagosValidationSchema = yup.object().shape({
    codigopagoelectronico: yup
        .number()
        .max(99999999999999)
        .typeError('Solo se permiten números')
        .required('El código es obligatorio para realizar pagos'),
    })
    return(
        <ScrollView>            
            <View style={styles.pagosContainer}>
                <Formik
                    enableReinitialize
                    validationSchema={pagosValidationSchema}
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
                          name="codigopagoelectronico"
                          placeholder="  Código de pago electrónico"
                          style={styles.textInput}
                          onChangeText={handleChange('codigopagoelectronico')}
                          onBlur={handleBlur('codigopagoelectronico')}
                          value={values.codigopagoelectronico}
                          // keyboardType= "default"
                        />
                      </>
                    )}
                </Formik>
                <SelectPicker
                    onValueChange={(value) => {
                        // Do anything you want with the value. 
                        // For example, save in state.
                        setSelected(value);
                    }}
                    selected={selected}
                    placeholder="Seleccione una Cuenta"
                    placeholderStyle={{fontSize:15, color: "black"}}
                    style={styles.containerSelect}
                    doneButtonText="Listo"
                    
                    >
                    
                    {Object.values(options).map((val, index2) => (
                        <SelectPicker.Item label={val} value={val} key={index2} />
                    ))}
        
                </SelectPicker>
                <Text style={{ textAlign: "center", top: "1%", fontSize: 20 }}>
                  Saldo: $300
                  {/* {nombreBanco}  aca tengo que obtener el saldo de la cuenta de la bd*/}
                </Text>


                {/* aca va el flatlist facturas */}



                <View style={{top:"50%", width:width, height:height, alignItems:"center"}}> 
                  <Text style={{ textAlign: "center", top: "0%", fontSize: 20 }}>
                    Total NO vencido: $900
                    {/* {nombreBanco}  aca tengo que obtener el total no vencido de facturas de la bd*/}
                  </Text>
                  <Formik
                      enableReinitialize
                      validationSchema={pagosValidationSchema}
                      initialValues={{ montoapagar: ''}}
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
                            name="montoapagar"
                            placeholder="  Monto a pagar"
                            style={{...styles.textInput, top:"0%", width:"70%" }}
                            onChangeText={handleChange('montoapagar')}
                            onBlur={handleBlur('montoapagar')}
                            value={values.montoapagar}
                            keyboardType= 'number-pad'
                          />
                        </>
                      )}
                  </Formik>
                  <Button
                        // onPress={handleSubmit}
                        title="Pagar"
                        // disabled={!isValid}
                        color={materialTheme.COLORS.BUTTON_COLOR}
                       
                    />
                </View>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
  pagosContainer:{
    width:"70%",
    // left:"1%",
    top:"5%",
    // alignContent:"center",
    alignItems:"center",
    alignSelf:"center"
  },
  containerSelect:{
    backgroundColor:"white",
    alignSelf:"center",
    width:"100%",
    margin:10,
    alignItems:"center",
    borderRadius:10

  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 10,
  },
})


export default PagoServicios
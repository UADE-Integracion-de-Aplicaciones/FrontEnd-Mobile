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
  FlatList, 
  TouchableOpacity,
  Image,
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
import CustomMultiPicker from "react-native-multiple-select-list";
import { findLastKey } from 'lodash';
// import Switch from "./Switch";
const options = ["2398473829", "532332294", "887624840"]; //cambiar para obtener los valores de la bd
const userList = [{
  "id": 1,
  "name":"Tom"
},
{
  "id": 2,
  "name":"Michael"
  
},
{
  "id": 3,
  "name":"Christin"
},
{
  "id": 4,
  "name":"Tom"
},
{
  "id": 5,
  "name":"Michael"
  
},
{
  "id": 6,
  "name":"Tom"
},
{
  "id": 7,
  "name":"Michael"
  
},
{
  "id": 8,
  "name":"Tom"
},
{
  "id": 9,
  "name":"Michael"
  
},];


function PagoServicios(props){
  const { navigation } = props
  const [cuenta, setCuenta] = useState("");
  const [cbucuenta, setCBUPicker] = useState([]);
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [facturas, setFacturas] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [yourDependency]);

  const fetchData = () => {setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/photos")
    .then(response => response.json())
    .then(responseJson => {
      responseJson = responseJson.map(item => {
        item.isSelect = false;
        item.selectedClass = styles.list;
      return item;
    });
    setLoading(false);
    setFacturas(userList);
    }).catch(error => {setLoading(false);
    });
    };

    const FlatListItemSeparator = () => <View style={styles.line} />;

    const selectItem = data => {
      data.item.isSelect = !data.item.isSelect;
      data.item.selectedClass = data.item.isSelect?
                    styles.selected: styles.list;
      const index = facturas.findIndex(
        item => data.item.id === item.id
      );
      const newData = [...facturas];
      newData[index] = data.item;
      setFacturas(newData);
      };
  
  const pagosValidationSchema = yup.object().shape({
    codigopagoelectronico: yup
        .number()
        .max(99999999999999)
        .typeError('Solo se permiten números')
        .required('El código es obligatorio para realizar pagos'),
    });

    const renderItem = data =>
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass]}      
      onPress={() => selectItem(data)}
    >
    {/* <Image
      source={{ uri: data.item.thumbnailUrl }}
      style={{ width: 40, height: 40, margin: 6 }}
    /> */}
    {/* <Text style={styles.lightText}>  {data.item.title.charAt(0).toUpperCase() + data.item.title.slice(1)}  </Text> */}
    <Text style={styles.lightText}> {data.item.name.charAt(0).toUpperCase() + data.item.name.slice(1)}</Text>
    </TouchableOpacity>

    // render() {
    // const itemNumber = facturas.filter(item => item.isSelect).length;

    // if (loading) {return (
    // <View style={styles.loader}>
    // <ActivityIndicator size="large" color="purple" />
    // </View>
    // );
    // }
    return(
                   
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

                <Text style={{ textAlign: "center", top: "3%", fontSize: 30 }}>
                  Facturas
                  {/* {nombreBanco}  aca tengo que obtener el saldo de la cuenta de la bd*/}
                </Text>
                {/* <View style={{top: "3%", height: "30%"}}>
                </View> */}
                <View style={{width: width, elevation: 10, backgroundColor: "white", top: "5%", alignItems: 'center',alignSelf:"center", height: "30%"}}>
                <FlatList 
                  data={facturas}
                  ItemSeparatorComponent={FlatListItemSeparator}
                  renderItem={item => renderItem(item)} 
                  keyExtractor={item => item.id.toString()}
                  extraData={facturas}
                  style={{width: width, borderColor: "black"}}
                />
                </View>
                {/* aca va el flatlist facturas */}



                <View style={{top:"5%", width:width, height:height, alignItems:"center"}}> 
                  <Text style={{ textAlign: "center", top: "3%", fontSize: 20 }}>
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
                            style={{...styles.textInput,top:"3%", width:"70%" }}
                            onChangeText={handleChange('montoapagar')}
                            onBlur={handleBlur('montoapagar')}
                            value={values.montoapagar}
                            keyboardType= 'number-pad'
                          />
                        </>
                      )}
                  </Formik>
                  <View style={{top: "3%"}}>
                  <Button
                        // onPress={handleSubmit}
                        title="Pagar"
                        // disabled={!isValid}
                        
                        color={materialTheme.COLORS.BUTTON_COLOR}
                       
                    />
                    </View>
                </View>
            </View>
        
    )

}

const styles = StyleSheet.create({
  pagosContainer:{
    // width:"70%",
    // left:"1%",
    flex: 1,
    // top:"5%",
    backgroundColor: materialTheme.COLORS.BACKGROUND,
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
  loader: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  
  list: {
    paddingVertical: 5,
    margin: 3,
    flexDirection: "row",
    // backgroundColor: "#192338",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1
  },
  selected: {backgroundColor: "#FA7B5F"},
  
  lightText: {
    // color: "#f7f7f7",
    width: 200,
    paddingLeft: 15,
    fontSize: 12
   },
  
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor:"black"
  },
  
  icon: {
    position: "absolute",  
    bottom: 20,
    width: "100%", 
    left: 290, 
    zIndex: 1
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
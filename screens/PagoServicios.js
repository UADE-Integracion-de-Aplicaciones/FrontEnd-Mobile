import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
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
import moment from 'moment';
import * as yup from 'yup';
import SelectPicker from 'react-native-form-select-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Lupa from '../assets/icons/lupa.png';



function PagoServicios(props){
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [facturas, setFacturas] = useState([]);
  const [cuentasPicker, setCuentasPicker] = useState([]); //setear las cuentas del usuario mediante consulta de bd con el id del usuario como parametro
  const [clientid, setClientId] = useState("");
  const [saldoCuentaSeleccionada, setSaldo]=useState(0);
  const [token, setToken] = useState("");
  const [total, setTotal] = useState(0);
  const [pagoId, setPagoId] = useState([]);
  // const [codigoPago, setCodigoPago] = useState("");
  

  
  const postPagoServicio = async (monto) => {

    var pagarInfo = {
      "facturas_ids": [],
      "numero_cuenta": selected,
      "cantidad": 0
    };
    for(let i = 0; i<facturas.length; ++i){
      if(facturas[i].isSelect){
        pagarInfo.facturas_ids.push(facturas[i].id)
      }
    }
    pagarInfo.cantidad = parseFloat(monto);
    pagarInfo.cantidad.toFixed(2);
    console.log(pagarInfo);

      axios
      .post('https://integracion-banco.herokuapp.com/transacciones/clientes/pagar_servicio', pagarInfo ,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        // console.log(res);
        alert("El pago se ha realizado con exito");
       
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
    };



  const getDataUsingSimpleGetCall3 = async (codigoPago) => {
    
    var codigo = "";
    codigo = codigoPago.codigopagoelectronico;
    console.log(codigo);
    console.log(selected);
    // codigoPago = "2223145421332"
    setLoading(true);
      axios
      .get('https://integracion-banco.herokuapp.com/facturas/'+codigo+'', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        // console.log(res);
        var total = 0.0;
        // console.log(res.data.facturas[1]);
      var id = 1;
      var temp = [];
      for (let i = 0; i < res.data.facturas.length; ++i) {
        
          temp.push(res.data.facturas[i]);
          
      }

      
      temp = temp.map(item => {

          item.index = 0;
          item.isSelect = false;
          item.selectedClass = styles.list;
        return item;
        });

        for(let i = 0; i < temp.length; ++i){
          temp[i].index = i + 1;
          temp[i].importe = parseFloat(temp[i].importe);
          temp[i].importe.toFixed(2);
          temp[i].fecha_vencimiento = moment(temp[i].fecha_vencimiento).format("DD-MM-YYYY");
          total = temp[i].importe + total;
        }


     
      console.log(temp);

        setTotal(total);
        setLoading(false);
        setFacturas(temp);
       
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        alert(error.message);
      });
    };


    const FlatListItemSeparator = () => <View style={styles.line} />;

    const selectItem = data => {
      data.item.isSelect = !data.item.isSelect;
      data.item.selectedClass = data.item.isSelect?
                    styles.selected: styles.list;
      const index = facturas.findIndex(
        item => data.item.index === item.index
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
              console.log(res.data.cuentas[i].numero_cuenta);
              temp.push(res.data.cuentas[i].numero_cuenta);
              
            }
            setCuentasPicker(temp);
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


        const getDataUsingSimpleGetCall2 = async (nrocuenta) => {
          console.log(nrocuenta);
            axios
            .get('https://integracion-banco.herokuapp.com/cuentas/'+nrocuenta+'', {
              headers: {
                Authorization: 'Bearer ' + token
              }
            })
            .then(res => {
              // console.log(res);
              var tempsaldo = 0;
              tempsaldo=res.data.cuenta.saldo;
              tempsaldo = parseFloat(tempsaldo);
              tempsaldo = tempsaldo.toFixed(2);
              console.log(tempsaldo);
              setSaldo(tempsaldo);
             
            })
            .catch(function (error) {
              // handle error
              alert(error.message);
            });
          };

      


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
    <Text style={styles.lightText}> Numero factura: {data.item.numero_factura.charAt(0).toUpperCase() + data.item.numero_factura.slice(1)}</Text>
    <Text style={styles.lightText}> Importe: ${data.item.importe}</Text>
    <Text style={styles.lightText}> Vence: {data.item.fecha_vencimiento}</Text>
    <Text style={styles.lightText}> Fecha de pago: {moment(data.item.fecha_pagado).format("DD-MM-YYYY")}</Text>
    
    
    
    </TouchableOpacity>

    // render() {
    // const itemNumber = facturas.filter(item => item.isSelect).length;

    // if (loading) {return (
    // <View style={styles.loader}>
    // <ActivityIndicator size="large" color="purple" />
    // </View>
    // );
    // }
//// ---------------------------------------------------------- TERMINA ESTILO DE FACTURAS ----------------------------------------------------

    return(
                   
            <ScrollView  onPress={Keyboard.dismiss} nestedScrollEnabled={true} >
              <View style={styles.pagosContainer}>
              <Block flex style={{backgroundColor: materialTheme.COLORS.BACKGROUND, width:width, height:height}} >
                <View style={{flexDirection:'row', height:'25%', width:"60%", left:"8%"}}>
                    <Formik
                        enableReinitialize
                        // validationSchema={pagosValidationSchema}
                        initialValues={{ codigopagoelectronico: ''}}
                        onSubmit={values => getDataUsingSimpleGetCall3(values)}
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
                              />

                              <TouchableOpacity style={{ height: "25%", width: "70%",left:"0%", top:"7%"}} onPress={handleSubmit}>
                                <Image
                                    source={Lupa}
                                    style={{top:"10%", height: "50%", width: "15%" }}
                                />
                              </TouchableOpacity>
                            
                          </>
                        )}
                    </Formik>
                   
                    
                </View>
                <View style={{top:"-15%"}}>
                  <SelectPicker
                      onValueChange={(value) => {
                          setSelected(value);
                          getDataUsingSimpleGetCall2(value)
                      }}
                      selected={selected}
                      placeholder="Seleccione una Cuenta"
                      placeholderStyle={{fontSize:15, color: "black"}}
                      style={styles.containerSelect}
                      doneButtonText="Listo"
                      
                      >
                      
                      {Object.values(cuentasPicker).map((val, index2) => (
                          <SelectPicker.Item label={val} value={val} key={index2} />
                      ))}
          
                  </SelectPicker>
                  <Text style={{ textAlign: "center", top: "1%", fontSize: 20 }}>
                    Saldo: $
                    {saldoCuentaSeleccionada}
                    {/* {nombreBanco}  aca tengo que obtener el saldo de la cuenta de la bd*/}
                  </Text>

                  <Text style={{ textAlign: "center", top: "3%", fontSize: 30 }}>
                    Facturas
                    {/* {nombreBanco}  aca tengo que obtener el saldo de la cuenta de la bd*/}
                  </Text>
                  {/* <View style={{top: "3%", height: "30%"}}>
                  </View> */}
                  <View style={{width: width, elevation: 10, backgroundColor: "white", top: "5%", alignItems: 'center',alignSelf:"center", height: "20%"}}>
                    <ScrollView horizontal={true} >
                      <FlatList 
                         nestedScrollEnabled={true}
                        data={facturas}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        renderItem={item => renderItem(item)} 
                        keyExtractor={item => item.id.toString()}
                        extraData={facturas}
                        style={{width: width, borderColor: materialTheme.COLORS.BUTTON_COLOR,
                          // elevation: 10,
                          borderWidth: 2}}
                      />
                    </ScrollView> 
                  </View>
                  {/* aca va el flatlist facturas */}

                  <View style={{top:"5%", width:width, height:height, alignItems:"center"}}> 
                    <Text style={{ textAlign: "center", top: "3%", fontSize: 20 }}>
                      Total NO vencido: $
                      {total}
                      {/* {nombreBanco}  aca tengo que obtener el total no vencido de facturas de la bd*/}
                    </Text>
                    <Formik
                        enableReinitialize
                        // validationSchema={pagosValidationSchema}
                        initialValues={{ montoapagar: ''}}
                        onSubmit={values => postPagoServicio(values.montoapagar)}
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

                            <TouchableOpacity                 
                              onPress={handleSubmit}
                              // disabled={!isValid}
                              style={{...styles.button, justifyContent:"center"}}>
                                <Text style={{alignSelf:"center", color:"white"}}>Pagar </Text>
                            </TouchableOpacity>
                            
                          </>
                        )}
                    </Formik>
                    
                  </View>
                </View>
                </Block>
                </View>
            </ScrollView>
        
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
    alignSelf:"center",
  },
  containerSelect:{
    backgroundColor:"white",
    alignSelf:"center",
    width:"90%",
    margin:10,
    alignItems:"center",
    borderRadius:10,
    borderColor: materialTheme.COLORS.BUTTON_COLOR,
    borderRadius: 10,
    elevation: 10,
    borderWidth: 2,

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
    flexDirection: "column",
    // backgroundColor: "#192338",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
    borderColor: materialTheme.COLORS.BUTTON_COLOR,
    borderRadius: 10,
    elevation: 10,
    borderWidth: 2
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
})


export default PagoServicios
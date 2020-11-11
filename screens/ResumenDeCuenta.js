import React, {useState, useEffect, Component} from 'react';
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
import { Block, theme, Text } from 'galio-framework';
const { height, width } = Dimensions.get('screen');
import SelectPicker from 'react-native-form-select-picker';
import TablaResumen from './componenteResumen/TablaResumen';
import { Table, Row, Rows } from 'react-native-table-component';
import materialTheme from '../constants/Theme';


function ResumenDeCuenta(props){
        // const [cuenta, setCuenta] = useState("");
        const [cuentasPicker, setCuentasPicker] = useState(["2398473829", "532332294", "887624840"]); //setear las cuentas del usuario mediante consulta de bd con el id del usuario como parametro

        const [selected, setSelected] = useState(); //este sirve para hacer consulta de saldo y pasarlo al TablaResumen pa mostrar el resumen se esa cuenta seleccionada
        const [saldoCuentaSeleccionada, setSaldo]=useState(1000); //setear el saldo haciendo la consulta en la bd con la cuenta que se eligio del selectedpicker
        
          return(
                  <View style={styles.resumenContainer}>
                      <SelectPicker
                          onValueChange={(value) => {
                              setSelected(value);
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
                      <Text style={{ textAlign: "center", fontSize: 20 }}>
                        Saldo: $
                        {saldoCuentaSeleccionada}
                      </Text>
                      <Row data={['Fecha', 'Concepto', 'Monto']} style={styles.head} textStyle={styles.text}/>

                      <ScrollView style={{width:"100%", left:"5%", top:"2%",height:"80%",marginBottom:"5%", alignContent:"center" }}>
                            {/* Los datos estan harcodeados, hay que pasar como parametro el numero de cuenta  a la tabla*/}
                             <TablaResumen></TablaResumen>
                      </ScrollView>
                  </View>
          )
}

const styles = StyleSheet.create({
  resumenContainer:{
    width:"100%",
    height:"100%",
    // top:"5%",
    // alignItems:"center",
    backgroundColor: materialTheme.COLORS.BACKGROUND,
    alignSelf:"center",
    alignItems:"center"
  },
  containerSelect:{
    backgroundColor:"white",
    alignSelf:"center",
    width:"70%",
    margin:10,
    alignItems:"center",
    borderRadius:10,
    borderColor: materialTheme.COLORS.BUTTON_COLOR,
    borderWidth:2,
    elevation: 10
        // borderColor: materialTheme.COLORS.BUTTON_COLOR,

  },
  head: { height: "5%", width:"90%", backgroundColor: materialTheme.COLORS.BUTTON_COLOR, borderRadius:7, top:"4%" },
  text: { margin: 6, borderRadius:7 , alignSelf:"center",}
})


export default ResumenDeCuenta
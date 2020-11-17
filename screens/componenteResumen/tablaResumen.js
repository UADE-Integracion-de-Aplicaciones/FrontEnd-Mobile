import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
const { height, width } = Dimensions.get('screen');
import materialTheme from '../../constants/Theme';



function TablaResumen(arraicito){
      // este array contiene todos los datos de la factura Fecha, Concepto, Monto. Hacer un setArrayFCM con estos datos desde la base de datos
      // con el valor de la cuenta como parametro en la consulta.
      // const [arrayFCM, setArrayFCM]=useState([
      //   ['12/09/2020', 'Alquiler', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['12/09/2020', 'Compras', '$700'],
      //   ['02/09/2020', 'Pagos', '$900'],]
      // );
      const arrayFCM=arraicito;

    
      return(
        <View style={styles.containerTab}>
            <Table borderStyle={{borderWidth:2, borderColor: materialTheme.COLORS.BUTTON_COLOR,}} style={{ width:"100%", height:"100%"}}>
                <Rows data={arrayFCM} textStyle={styles.textTab}/>
            </Table>
        </View>
      )
    
}

const styles = StyleSheet.create({
    containerTab: { width:"90%", height:"100%",backgroundColor:"white"},
    textTab: { margin: 6 , alignSelf:"center"}
});




export default TablaResumen
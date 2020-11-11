import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
const { height, width } = Dimensions.get('screen');




function TablaResumen(props){
      // este array contiene todos los datos de la factura Fecha, Concepto, Monto. Hacer un setArrayFCM con estos datos desde la base de datos
      // con el valor de la cuenta como parametro en la consulta.
      const [arrayFCM, setArrayFCM]=useState([
        ['12/09/2020', 'Alquiler', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['12/09/2020', 'Compras', '$700'],
        ['02/09/2020', 'Pagos', '$900'],]
      );

    
      return(
        <View style={styles.container}>
            <Table borderStyle={{borderWidth:2,borderColor:"#ffbd59"}} style={{ width:"100%", height:"100%"}}>
                <Rows data={arrayFCM} textStyle={styles.text}/>
            </Table>
        </View>
      )
    
}

const styles = StyleSheet.create({
    container: { width:"90%", height:"100%",backgroundColor:"white"},
    text: { margin: 6 , alignSelf:"center"}
});




export default TablaResumen
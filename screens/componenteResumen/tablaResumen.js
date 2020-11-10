


import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
const { height, width } = Dimensions.get('screen');
// import materialTheme from '../constants/Theme';


// import Switch from "./Switch";
const options = ["2398473829", "532332294", "887624840"]; //cambiar para obtener los valores de la bd


class TablaResumen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            // todos estos datos se tienen que obtener de la bd con la cuenta como id
          tableData: [
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
            ['12/09/2020', 'Compras', '$700'],
            ['02/09/2020', 'Pagos', '$900'],
          ]
        }
      }
    render(){
        const state = this.state;
          return(
            <View style={styles.container}>
                <Table borderStyle={{borderWidth:2,borderColor:"#ffbd59"}} style={{ width:"100%", height:"100%"}}>
                    <Rows data={state.tableData} textStyle={styles.text}/>
                </Table>
            </View>
          )
    }
}

const styles = StyleSheet.create({
    container: { width:"90%", height:"100%",backgroundColor:"white"},
    text: { margin: 6 , alignSelf:"center"}
});




export default TablaResumen
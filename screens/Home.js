import React, { Component } from "react";
import { StyleSheet, View, ScrollView,Dimensions } from "react-native";
import MaterialHeader1 from "../components/MaterialHeader1";
import MaterialCardWithImageAndTitle from "../components/MaterialCardWithImageAndTitle";
import materialTheme from '../constants/Theme';
const { height, width } = Dimensions.get('screen');
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { TouchableOpacity } from "react-native";
function Home(props) {
  const { navigation } = props

  return (
    <View style={styles.container}>
      <ScrollView style={{backgroundColor: materialTheme.COLORS.BACKGROUND, width:width, height:height}}>
        <View>
      <MaterialHeader1 style={styles.materialHeader1}></MaterialHeader1>
      </View>
      <TouchableOpacity>
        <View style={{paddingTop:"10%"}}>
          
          <Card style={styles.card}>
          {/* < CardImage 
              source={{uri: 'http://bit.ly/2GfzooV'}} 
              title="Top 10 South African beaches"
          /> */}
            <CardTitle
                title="Resumen de Cuenta"
            />
            <CardContent text="Vea los egresos de su cuenta" />
            <CardAction 
                separator={true} 
                inColumn={false}>
                <CardButton
                onPress={() => navigation.navigate("Home")}
                title="Acceder >"
                color="#FEB557"
                />
            </CardAction>
          </Card>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{paddingTop:"5%"}}>
          <Card style={styles.card} >
          {/* <CardImage 
              source={{uri: 'http://bit.ly/2GfzooV'}} 
              title="Top 10 South African beaches"
          /> */}
            <CardTitle
                title="Pagar Servicios/Impuestos"
            />
            <CardContent text="Pague sus servicios o impuestos" />
            <CardAction 
                separator={true} 
                inColumn={false}>
                <CardButton
                onPress={() => {}}
                title="Acceder >"
                color="#FEB557"
                />
            </CardAction>
          </Card>
        </View>
      </TouchableOpacity>
        
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    backgroundColor: materialTheme.COLORS.BACKGROUND,
    height: 740,
    width: 360
  },
  materialHeader1: {
    height: 76,
    // position: "absolute",
    left: 0,
    top: 23,
    right: 0
  },
  materialCardWithImageAndTitle: {
    height: 166,
    width: 339,
    position: "absolute",
    left: 11,
    top: 110
  },
  card: {
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 5,
    borderRadius: 20
  }
});

export default Home;

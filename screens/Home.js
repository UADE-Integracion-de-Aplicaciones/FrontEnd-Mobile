import React, { Component } from "react";
import { StyleSheet, View, ScrollView,Dimensions, Image } from "react-native";
import materialTheme from '../constants/Theme';
const { height, width } = Dimensions.get('screen');
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { TouchableOpacity } from "react-native";

import Logo from "../assets/images/homeLogo.png";
import User from "../assets/images/user.png";
function Home({route, navigation}) {
  // const { navigation } = props
  const {idUsuario}=route.params;
  console.log("entro al home");
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: materialTheme.COLORS.BACKGROUND, width:"100%", height:"100%"}}>
      <View style={styles.container2}>
      <Image
           source={Logo}
          style={{ height: "50%", width: "50%", left:"85%", top: "2%"}}
       />
      <TouchableOpacity style={{ height: "100%", width: "25%", left: "40%", top:"7%"}} onPress={() => navigation.navigate("Perfil", {idUsuario: idUsuario}) }>
      <Image
           source={User}
          style={{top:"10%", height: "40%", width: "41%" }}
       />
      </TouchableOpacity>
    </View>
    {/* <ScrollView> */}
    <View >
      <TouchableOpacity onPress={() => navigation.navigate("ResumenDeCuenta")} >
        <View style={{paddingTop:"5%", height: "70%"}}>
          
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
                onPress={() => navigation.navigate("ResumenDeCuenta")}
                title="Acceder >"
                color="#FEB557"
                />
            </CardAction>
          </Card>
        </View>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPress={() => navigation.navigate("PagoServicios")} style={{top:"-47%"}} >
        <View style={{height:"70%"}}>
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
                onPress={() => navigation.navigate("PagoServicios")}
                title="Acceder >"
                color="#FEB557"
                />
            </CardAction>
          </Card>
        </View>
      </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
    
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
  },
  container2: {
    backgroundColor: "rgba(255,189,89,1)",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    justifyContent: "space-between",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    // top: "4%",
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3,
    alignContent: "center",
    width: "100%",
    height: "14%", //tratar de no modificar
  },
  title: {
    fontSize: 18,
    color: "#FFFFFF",
    backgroundColor: "transparent",
    lineHeight: 18
  },
  textWrapperFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rightIconButton: {
    
    alignItems: "center",
    
  },
  rightIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 41,
    margin: 0,
    padding: 0
  }

});

export default Home;

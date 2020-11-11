import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
// import Icon from "react-native-vector-icons/EvilIcons";
import Logo from "../assets/images/homeLogo.png";
import User from "../assets/images/user.png";

function MaterialHeader1(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Image
           source={Logo}
          style={{ height: "100%", width: "40%", left:"130%" }}
       />
      <TouchableOpacity style={{ height: "100%", width: "100%", left: "220%", top:"5%" }}>
      <Image
           source={User}
          style={{top:"10%", height: "32%", width: "7%" }}
       />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3,
    alignContent: "center",
    width: "100%",
    height: "12%", //tratar de no modificar
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

export default MaterialHeader1;

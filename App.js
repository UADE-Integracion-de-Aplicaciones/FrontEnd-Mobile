import React, { useState, useCallback, useEffect } from "react";
import { Platform, StatusBar, Image, Text, StyleSheet, View, TextInput, Button } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
// import { Ionicons } from "@expo/vector-icons";
import { Block, GalioProvider } from "galio-framework";

import { Images, products, materialTheme } from "./constants/";

import { NavigationContainer } from "@react-navigation/native";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { Formik } from 'formik';
import LogIn from './screens/LogIn';
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import Registro from './screens/Registro';
import PagoServicios from './screens/PagoServicios';
import MainStackNavigator from './navigation/mainStackNavigator';
// import {Font} from 'expo';
// import { Ionicons } from "@expo/vector-icons";
import AntDesign from "./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf";
import Ionicons from "./node_modules/react-native-vector-icons/Fonts/Ionicons.ttf";


 const loadAssetsAsync = async () => {
   await Font.loadAsync({
     Ionicons,
   })
 };

 

export default function App(props) {
  loadAssetsAsync();
  // return <MainStackNavigator></MainStackNavigator>
  return <MainStackNavigator></MainStackNavigator>
}


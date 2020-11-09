import React, { useState, useCallback, useEffect } from "react";
import { Platform, StatusBar, Image, Text, StyleSheet, View, TextInput, Button } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
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
import MainStackNavigator from './navigation/mainStackNavigator';

// enableScreens();

// // cache app images
// const assetImages = [
//   Images.Pro,
//   Images.Profile,
//   Images.Avatar,
//   Images.Onboarding,
// ];

// // cache product images
// products.map((product) => assetImages.push(product.image));

// const TASK_NAME = "BACKGROUND_TASK";

// TaskManager.defineTask(TASK_NAME, () => {
//   try {
//     // fetch data here...
//     const receivedNewData = "Simulated fetch " + Math.random();
//     console.log("My task ", receivedNewData);

//     //TODO: identificar vencimientos y registrarlos en otra tabla
//     //TODO: registrar movimientos en cuenta para ingresos recurrentes y debitos automaticos
//     //TODO: actualizar saldos de las cuentas bancarias
//     return receivedNewData
//       ? BackgroundFetch.Result.NewData
//       : BackgroundFetch.Result.NoData;
//   } catch (err) {
//     return BackgroundFetch.Result.Failed;
//   }
// });

// const registerBackgroundTask = async () => {
//   try {
//     await BackgroundFetch.registerTaskAsync(TASK_NAME, {
//       minimumInterval: 10, // seconds,
//     });
//     console.log("Task registered");
//   } catch (err) {
//     console.log("Task Register failed:", err);
//   }
// };

// function cacheImages(images) {
//   return images.map((image) => {
//     if (typeof image === "string") {
//       return Image.prefetch(image);
//     } else {
//       return Asset.fromModule(image).downloadAsync();
//     }
//   });
// }



export default function App(props) {
  return <Registro></Registro>
}

  // useEffect(() => {
  //   registerBackgroundTask();
  // }, []);

  // const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  // const _loadResourcesAsync = async () => {
  //   const assetFont = Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //     ...Ionicons.font,
  //   });
  //   return Promise.all([assetFont, ...cacheImages(assetImages)]);
  // };

  // const _handleLoadingError = (error) => {
  //   // In this case, you might want to report the error to your error
  //   // reporting service, for example Sentry
  //   console.warn(error);
  // };

  // const _handleFinishLoading = () => {
  //   setIsLoadingComplete(true);
  // };



  // return (
  //   <React.Fragment >
  //       {!isLoadingComplete && !props.skipLoadingScreen && (
  //         <AppLoading
  //           startAsync={_loadResourcesAsync}
  //           onError={_handleLoadingError}
  //           onFinish={_handleFinishLoading}
  //         />
  //       )}
  //       {isLoadingComplete && (
  //         <NavigationContainer>
  //           <GalioProvider theme={materialTheme}>
  //             <Block flex>
  //               {Platform.OS === "ios" && <StatusBar barStyle="default" />}
  //               <LogIn/>
  //             </Block>
  //           </GalioProvider>
  //         </NavigationContainer>
  //       )}
      

  //   </React.Fragment> 
    
  // );
// }

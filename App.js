// import React, { useState, useCallback, useEffect } from "react";
// import { Platform, StatusBar, Image, Text, StyleSheet, View, TextInput, Button } from "react-native";
// import { AppLoading } from "expo";
// import { Asset } from "expo-asset";
// import * as Font from "expo-font";
// import { Ionicons } from "@expo/vector-icons";
// import { Block, GalioProvider } from "galio-framework";

// import { Images, products, materialTheme } from "./constants/";

// import { NavigationContainer } from "@react-navigation/native";




// import * as BackgroundFetch from "expo-background-fetch";
// import * as TaskManager from "expo-task-manager";
// import { Formik } from 'formik';
// import LogIn from './screens/LogIn';
// // Before rendering any navigation stack
// import { enableScreens } from "react-native-screens";

// import MainStackNavigator from './navigation/mainStackNavigator';

// // enableScreens();

// // // cache app images
// // const assetImages = [
// //   Images.Pro,
// //   Images.Profile,
// //   Images.Avatar,
// //   Images.Onboarding,
// // ];

// // // cache product images
// // products.map((product) => assetImages.push(product.image));

// // const TASK_NAME = "BACKGROUND_TASK";

// // TaskManager.defineTask(TASK_NAME, () => {
// //   try {
// //     // fetch data here...
// //     const receivedNewData = "Simulated fetch " + Math.random();
// //     console.log("My task ", receivedNewData);

// //     //TODO: identificar vencimientos y registrarlos en otra tabla
// //     //TODO: registrar movimientos en cuenta para ingresos recurrentes y debitos automaticos
// //     //TODO: actualizar saldos de las cuentas bancarias
// //     return receivedNewData
// //       ? BackgroundFetch.Result.NewData
// //       : BackgroundFetch.Result.NoData;
// //   } catch (err) {
// //     return BackgroundFetch.Result.Failed;
// //   }
// // });

// // const registerBackgroundTask = async () => {
// //   try {
// //     await BackgroundFetch.registerTaskAsync(TASK_NAME, {
// //       minimumInterval: 10, // seconds,
// //     });
// //     console.log("Task registered");
// //   } catch (err) {
// //     console.log("Task Register failed:", err);
// //   }
// // };

// // function cacheImages(images) {
// //   return images.map((image) => {
// //     if (typeof image === "string") {
// //       return Image.prefetch(image);
// //     } else {
// //       return Asset.fromModule(image).downloadAsync();
// //     }
// //   });
// // }



// export default function App(props) {
//   return <MainStackNavigator />
// }

//  /*!

//  =========================================================
//  * Material Kit React Native - v1.4.0
//  =========================================================
//  * Product Page: https://demos.creative-tim.com/material-kit-react-native/
//  * Copyright 2019 Creative Tim (http://www.creative-tim.com)
//  * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react-native/blob/master/LICENSE)
//  =========================================================
//  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

import React from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import { Images, products, materialTheme } from './constants/';

import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens';
import MainStackNavigator from './navigation/mainStackNavigator';
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

// cache product images
products.map(product => assetImages.push(product.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <NavigationContainer>
          <GalioProvider theme={materialTheme}>
            <Block flex>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <MainStackNavigator/>
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

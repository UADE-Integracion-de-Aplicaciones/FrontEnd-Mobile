
import React from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { Images, products, materialTheme } from './constants/';
import Registro from './screens/Registro';
import { NavigationContainer } from '@react-navigation/native';
import Screens from './navigation/Screens';
import MainStackNavigator from './navigation/mainStackNavigator';
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();




export default class App extends React.Component {
 

  render() {
    
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


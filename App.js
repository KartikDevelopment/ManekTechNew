/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider, useSelector } from 'react-redux';
import store from './source/Redux/store'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Test from './source/Screens/TestScreen'
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './source/Screens/Navigator';
const App = () => {
  

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
};



export default App;

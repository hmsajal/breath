import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Breath from './sources/breath'

export default class App extends Component {

  render() {    
    return (      
      <Breath/>
    );
  }
}

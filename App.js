import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Breath from './sources/breath'

export default class App extends Component {

constructor(props){
  super(props)
  this.firstTimeStore()
}

firstTimeStore = async () => {
    try {
      const value = await AsyncStorage.getItem('storageDuration')      
      if(value == null) {
          await AsyncStorage.setItem('storageDuration', '8')           
          await AsyncStorage.setItem('storageSound', '1')       
      }      
    }    
    catch{
    }    
}

  render() {    
    return (      
      <Breath/>
    );
  }
}

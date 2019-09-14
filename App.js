import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import Breath from './sources/breath'

export default class App extends Component {

  constructor(props){
    super(props)
      this.appAsyncGet()
  }


  appAsyncSet=async ()=>{
     AsyncStorage.setItem('storageDuration','8')
          AsyncStorage.setItem('storageSound','1')                       
  }

 appAsyncGet=async ()=>{
    const value = await AsyncStorage.getItem('storageDuration')        
    if(value == null){
      this.appAsyncSet()
    }
}

  render() {    
    return (      
      <Breath/>
    );
  }
}

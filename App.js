import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Breath from './sources/breath'

export default class App extends Component {

constructor(props){
  super(props)
}

  render() {    
    return (      
      <Breath/>
    );
  }
}

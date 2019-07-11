import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal} from 'react-native';

export default class BreathModal extends Component {

  render() {
    return (
      <Modal visible={this.props.modalProp} onRequestClose={this.props.modalBackPress}>
          <View style={{backgroundColor:'#ffffff', flex:1}}>

          </View>
      </Modal>
    );
  }
}
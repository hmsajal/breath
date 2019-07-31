import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal} from 'react-native';

export default class AboutModal extends Component {

  render() {
    return (
      <Modal visible={this.props.modalProp} onRequestClose={this.props.modalBackPress}>
          <View style={{backgroundColor:'#ffffe0', flex:1,alignItems:'center'}}>
            
            <View style={{flex:.4,justifyContent:'flex-start',width:'92%'}}>
              <View style={{flex:.2,justifyContent:'center'}}>
                <Text style={{fontSize:18,fontFamily:'tahoma',fontWeight:'bold',fontStyle:'italic'}}>About Developer</Text>
              </View>
              <View flex={.8}>
                <Text></Text>
              </View>              
            </View>

            <View style={{flex:.6,justifyContent:'flex-start',width:'92%'}}>
              <View style={{flex:.15,justifyContent:'center',}}>
                <Text style={{fontSize:18,fontFamily:'tahoma',fontWeight:'bold',fontStyle:'italic'}}>About breathing and this app</Text>
              </View>              
              <View flex={.85}>
                <Text></Text>
              </View>
            </View>

          </View>
      </Modal>
    );
  }
}
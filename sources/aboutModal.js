import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal,Dimensions} from 'react-native';

export default class AboutModal extends Component {
  
  render() {

   const {height,width}=Dimensions.get('window')
   const w=width

    return (
      <Modal visible={this.props.modalProp} onRequestClose={this.props.modalBackPress}>
          <View style={{backgroundColor:'#ffffe0', flex:1,alignItems:'center',paddingTop:10}}>
            
            <View style={{flex:.4,justifyContent:'flex-start',width:(w-30)}}>
              <View style={{flex:.22,justifyContent:'center'}}>
                <Text style={{fontSize:20,fontFamily:'tahoma',fontWeight:'bold',fontStyle:'italic'}}>About Developer</Text>
              </View>
              <View style={{flex:.78}}>
                <Text style={{fontSize:15,marginBottom:5}}>I am <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center',fontStyle:'italic'}}>Hasan Mahmud Sajal, </Text><Text style={{fontSize:15,marginBottom:5}}>a passionate application developer</Text></Text>                
                <Text style={{fontSize:15,marginBottom:5}}>I basically play with <Text style={{color:'#22cc77',fontWeight:'bold',fontSize:16}}>JavaScript</Text></Text> 
                <Text style={{fontSize:15,marginBottom:5}}>My favourite platform is <Text style={{color:'#dd6666',fontWeight:'bold',fontSize:16}}>React Native</Text></Text>                
              </View>              
            </View>

            <View style={{flex:.6,justifyContent:'flex-start',width:(w-30)}}>
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
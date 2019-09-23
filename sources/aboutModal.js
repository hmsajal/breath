import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal,Dimensions} from 'react-native';

export default class AboutModal extends Component {
  
  render() {

   const {height,width}=Dimensions.get('window')
   const w=width

    return (
      <Modal visible={this.props.modalProp} onRequestClose={this.props.modalBackPress}>
          <View style={{backgroundColor:'#ffffe0', flex:1,alignItems:'center',paddingTop:10}}>
            
            <View style={{flex:.3,justifyContent:'flex-start',width:(w-30)}}>
              <View style={{flex:.2,justifyContent:'center',marginBottom:5}}>
                <Text style={{fontSize:19,fontFamily:'tahoma',fontWeight:'bold',fontStyle:'italic',borderBottomWidth:1,borderBottomColor:'#888888'}}>About Developer</Text>
              </View>
              <View style={{flex:.65}}>
                  <Text style={{fontSize:15}}>I am
                        <Text style={{fontSize:16,fontWeight:'bold',alignSelf:'center',color:'#333333'}}> Hasan Mahmud Sajal, </Text>
                        <Text style={{fontSize:15,marginBottom:5}}>a passionate application developer. </Text>
                        <Text>I basically code in </Text>
                        <Text style={{color:'#000000',fontWeight:'bold',fontSize:20,fontFamily:'cursive'}}>JavaScript</Text>
                        <Text> and my favourite platform is </Text>
                        <Text style={{color:'#000000',fontWeight:'bold',fontSize:20,fontFamily:'cursive'}}>React Native.</Text>
                  </Text>                                             
              </View>   
              <View style={{flex:.15}}>
                <Text style={{fontSize:16}}>Contact: <Text style={{color:'#000000',fontSize:15}}>sajal.hm@gmail.com</Text></Text>
              </View>           
            </View>

            <View style={{flex:.7,justifyContent:'flex-start',width:(w-30)}}>              
                <View style={{flex:.11,justifyContent:'center',}}>
                  <Text style={{fontSize:19,fontFamily:'tahoma',fontWeight:'bold',fontStyle:'italic',borderBottomWidth:1,borderBottomColor:'#888888'}}>About breathing and this app</Text>
                </View>   
                <View flex={.89}>
                      <View style={{marginBottom:7}}>
                        <Text style={{fontSize:15}}>
                            <Text style={{color:'#111111',fontSize:15}}>Deep Breathing </Text> or <Text style={{color:'#111111',fontSize:15}}> Breathing Technique </Text>is a practice which relieves our stress, makes our life more productive and joyful. This app <Text style={{color:'#000000',fontSize:19,fontFamily:'cursive'}}>Happy Breathing </Text>will help you with this practice as a personal tool. 
                        </Text>
                      </View >

                      <View style={{marginBottom:10}}>
                          <Text style={{fontSize:15}}>
                              --Set the duration of your choice for each breath from settings menu.
                          </Text>                              
                          <Text style={{fontSize:15}}>
                              --Tap the start button and follow the app.
                          </Text>
                          <Text style={{fontSize:15}}>
                              --That's it and it's that simple.
                          </Text>
                      </View>

                      <View>
                        <Text style={{fontSize:15}}>
                            To know more about deep breathing:
                        </Text>                   
                      </View>  

                      <View>
                         <Text style={{fontSize:14,color:'#666666',fontStyle:'italic'}}>
                            https://www.webmd.com/balance/stress-management/stress-relief-breathing-techniques
                         </Text>
                      </View>                  
                </View>
            </View>

          </View>
      </Modal>
    );
  }
}
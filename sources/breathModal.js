import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal,Dimensions} from 'react-native';
import {Picker} from 'native-base'
import DurationManagement from './durationManagement.js'


export default class BreathModal extends Component {
  
  constructor(props){
    super(props)
    width = Dimensions.get('window').width

    this.state={
      selectedSoundValue:'key0',
      durationValue:5
    }
  }

  valueChangeFunc(value){
    this.setState({selectedSoundValue:value})
  }

  render() {
    return (
      <Modal visible={this.props.modalProp} onRequestClose={()=>{this.props.modalBackPress(this.state.durationValue)}}>
          <View style={{backgroundColor:'#ffffe0', flex:1}}>
              <View style={{flex:.1,justifyContent:'center',borderBottomWidth:2,borderBottomColor:'#aaaaaa',
                            width:width-30,alignSelf:'center'
                          }}
              >
                <Text style={{fontSize:22,fontStyle:'italic',fontWeight:'bold',}}>Settings</Text>
              </View>

              <View style={{flex:.12,justifyContent:'center', alignItems:'flex-start',width:width-30,
                            justifyContent:'flex-end',alignSelf:'center'
                           }}>
                <Text style={{fontSize:16}}>Duration per breathing in second</Text>
              </View>
              <View>
                <DurationManagement currentValueTransfer={(val)=>{this.setState({durationValue:val})}}
                                                          parentDuration={this.state.durationValue}
                />                
              </View>              
              <View style={{flex:.15,justifyContent:'center',alignItems:'flex-start',width:width-30,
                          alignSelf:'center',justifyContent:'flex-end'
                          }}>
                  <Text style={{fontSize:16}}>Choose the Interval sound</Text>
              </View>
              <View style={{flex:.05}}/>
              <View style={{flex:.1,justifyContent:'center', width:width-30, alignSelf:'center',
                            borderWidth:1,borderColor:'#333333', borderRadius:10, height:width*.12}}
                          >
                    <Picker                    
                    mode='dropdown'                                      
                    selectedValue={this.state.selectedSoundValue}
                    onValueChange={(value)=>{this.valueChangeFunc(value)}}                                        
                    >
                      <Picker.Item label="soundName1" value="key0" />
                      <Picker.Item label="soundName2" value="key1" />
                      <Picker.Item label="soundName3" value="key2" />
                      <Picker.Item label="soundName4" value="key3" />
                      <Picker.Item label="soundName5" value="key4" />
                    </Picker>
              </View>                                                       
           </View>               
      </Modal>     
    );
  }
}
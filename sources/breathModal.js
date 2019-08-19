import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal,Dimensions} from 'react-native';
import {Picker} from 'native-base'


export default class BreathModal extends Component {
  

  constructor(props){
    super(props)
    width = Dimensions.get('window').width

    this.state={
      selectedDurationValue:"key4"
    }
  }

  valueChangeFunc(value){
    this.setState({selectedDurationValue:value})
  }

  render() {
    return (
      <Modal visible={this.props.modalProp} onRequestClose={this.props.modalBackPress}>
          <View style={{backgroundColor:'#ffffe0', flex:1}}>
              <View style={{flex:.07,justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#70707070',
                            width:width-30,alignSelf:'center'
                          }}
              >
                <Text style={{fontSize:20,fontStyle:'italic',fontWeight:'bold',}}>Settings</Text>
              </View>

              <View style={{flex:.1, justifyContent:'center',width:width-30,alignSelf:'center'}}>                
                <Picker
                mode='dialog'
                supportedOrientations="landscape"               
                style={{ width: undefined }}
                placeholder="Select the duration"                
                selectedValue={this.state.selectedDurationValue}
                onValueChange={()=>{this.valueChangeFunc(value)}}
                >
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
              </Picker>
              </View>

              <View style={{flex:.1,flexDirection:'row', alignItems:'center',width:width-30,alignSelf:'center'}}>
                <Text style={{fontSize:16}}>Choose the interval sound</Text>
              </View>
          </View>
      </Modal>
    );
  }
}
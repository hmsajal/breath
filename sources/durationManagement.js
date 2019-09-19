import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class DurationManagement extends Component {
  
    constructor(props){
      super(props)     
      width=Dimensions.get('window').width
      height=Dimensions.get('window').height      
      this.state={
          currentValue:this.props.parentDuration
      }
    }

    minusFunc(){        
        
        if(this.state.currentValue >5){
            this.props.currentValueTransfer(this.state.currentValue-1)
            this.setState({
                currentValue:this.state.currentValue-1
            })
        }
        
        
    }

    plusFunc(){
        
        if(this.state.currentValue < 20){
            this.props.currentValueTransfer(this.state.currentValue+1)
            this.setState({
                currentValue:this.state.currentValue+1
            })
        }
        
    }

    render(){
        return(
            <View style={{height:height*.15,width:width-40,borderBottomWidth:1,alignSelf:'center',alignItems:'center',
                          borderColor:'#555555',flexDirection:'row', justifyContent:'space-evenly'
                        }}>
                            <TouchableOpacity onPress={()=>{this.minusFunc()}}>
                                <Icon name='minus-box' size={35}/>
                            </TouchableOpacity>

                            <View style={{backgroundColor:'#555555',width:width*.12,height:height*.05,
                                          alignItems:'center',justifyContent:'center',borderRadius:5
                                        }}>
                                <Text style={{color:'#dddddd',fontSize:18}}>{this.state.currentValue}</Text>
                            </View>                            

                            <TouchableOpacity onPress={()=>{this.plusFunc()}}>
                                <Icon name='plus-box' size={35} />
                            </TouchableOpacity>                            
            </View>
        )
    }
        
}
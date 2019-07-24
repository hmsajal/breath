import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Bar from 'react-native-progress/Bar'
import Sound from 'react-native-sound'

export default class Progress extends Component {

    constructor(props){
        super(props);
        this.state={
            barProgress:this.props.iniProgress,
            increment:this.props.increProgress,
            unmountVar:(this.props.iniProgress+1)%2
        }
    }    
    sound=new Sound('chinup.mp3')
    
        
        child=setInterval(()=>{
            this.setState({barProgress:this.state.barProgress+this.state.increment});
            if(this.state.barProgress==this.state.unmountVar) 
            {
                clearInterval(child)
                this.sound.play()
            }
        },100);

              
         

  render() {      
    
    return (
      <View style={styles.breathingTimerView}>
          <Bar width={210} height={75} progress={this.state.barProgress} color='#117777'/>
      </View>
    );
  }
}


const styles=StyleSheet.create({
   
    breathingTimerView:{
        flex:.36,   
        justifyContent:'center',     
        alignItems:'center',           
    },
})
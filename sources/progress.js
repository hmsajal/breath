import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Bar from 'react-native-progress/Bar'
import Sound from 'react-native-sound'

export default class Progress extends Component {

    constructor(props){
        super(props);        
    }    
    
    
    sound=new Sound('chinup.mp3')
    
    mountFunc(starting=0,increment=.1){
        
        this.setState({barProgress:starting})
        this.setState({increProgress:increment})
        
        child=setInterval(()=>{
            
            this.setState({barProgress:(this.state.barProgress+this.state.increProgress)});
            
            console.log(this.state.barProgress,this.state.increProgress)
            if(this.state.barProgress<=0||this.state.barProgress>=1) 
            {
                clearInterval(child)
                this.sound.play()
            }
            
        },1000);
    }
  
  render() {      
    this.mountFunc()  
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
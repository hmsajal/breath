
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';

export default class Breath extends Component {
  
  state={
    count: 0,
    breatheInOut:'Breathe',
    buttonStatus: false,
    buttonTitle: 'Start',
    neededCount:0,
    numberOfCount:0
  }

  buttonAction(){
    if(this.state.buttonStatus==false){
      this.setState({buttonTitle:'Stop'})
      this.setState({breatheInOut:'Breath In'})
      setTimeout(()=>{this.setState({breatheInOut:'Breathe Out'})},10000)
      this.startTimer();
    }
    else{
      this.setState({buttonTitle:'Start'})
      this.stopTimer();
    }
    this.setState({buttonStatus:!this.state.buttonStatus})
  }
 
  startTimer=()=>{
      
      shortInterval= setInterval(() => {
         this.setState({count:this.state.count+1})            
      }, 1000);      

      breathInInterval= setInterval(() => {
          this.setState({breatheInOut:'Breathe In'})   
          this.setState({numberOfCount:this.state.numberOfCount+1})  

          setTimeout(()=>{
          this.setState({breatheInOut:'Breathe Out'})
          },10000);   

      }, 20000); 
     
  }

  stopTimer=()=>{
    clearInterval(breathInInterval);
    clearInterval(shortInterval);
    this.setState({count:0,numberOfCount:0,breatheInOut:'Breathe'})
  }
  
  render() {
    
    return (
      <View style={styles.container}>
          <View style={styles.breathingView}><Text  style={{fontSize:26,color:'#4B4E6DEE'}}>{this.state.breatheInOut}</Text></View>  
          <View style={styles.timerView}><Text style={{fontSize:40,color:'#000000aa'}}>{this.state.count}</Text></View>      
          <View style={styles.countView}><Text style={{fontSize:18,}}>Times Count: {this.state.numberOfCount}</Text></View>
          <View style={styles.topacityView}><TouchableOpacity><Text style={{fontSize:22,color:'#009933aa',backgroundColor:'#00993333'}}> Compensate </Text></TouchableOpacity></View>
          <View style={styles.buttonView}><Button title={this.state.buttonTitle} color='#009933' onPress={()=>this.buttonAction()}></Button></View>
      </View>
    );

  }
}

const styles=StyleSheet.create({
    
    container:{
        flex:1,         
    },
    breathingView:{
        flex:.25,
        justifyContent:'flex-end',
        alignItems:'center',           
    },
    timerView:{
        flex:.2,
        justifyContent:'flex-end',
        alignItems:'center',       
    },
    countView:{
        flex:.2,
        justifyContent:'center',
        alignItems:'center',
    },    
    topacityView:{
      flex:.15,
      justifyContent:'center',
      alignItems:'center',
    },
    buttonView:{
      flex:.2,
      justifyContent:'center',
      alignItems:'center',
    }

})
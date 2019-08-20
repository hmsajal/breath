import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity,Dimensions,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Test from 'react-native-progress'
import Sound from 'react-native-sound'

import BreathModal from './breathModal'
import AboutModal from './aboutModal'


export default class Breath extends Component {

  constructor(props){
    super(props);    

    this.width = Dimensions.get('window').width
    this.w = this.width*.5

    this.state={  
      breatheInOut:['Breath in','Breathe out','Tap the START button & breathe',''],
      breatheBool:2,
      buttonStatus: false,
      buttonTitle: '                            Start                            ',
      timesCountString: '',   
      numberOfCount:0,   
      totalCount:0,  
      initialProgress:0,      
      increProgressVal:[.01,-.01],    
      increment:0,
      barProgress:0,
      duration:5,
      settingsModalVisible:false,         
      aboutModalVisible:false,      
      breathingTextStyle:{
          fontSize:19,
          color:'#666666',       
          fontStyle:'italic',
          fontFamily:'time',          
      }
    },    
    this.setTimeOutFunction=this.setTimeOutFunction.bind(this)
    sound=new Sound('chinup.mp3')
  }  

   timerViewRendering(){
     return(
              this.state.buttonStatus==false
                          ? 
              
              <Text style={{fontSize:100,fontFamily:'cursive',fontStyle:'italic'}}> {this.state.duration} sec </Text>             
                          :
            ( (this.state.initialProgress)==0 
                          ?
              <Test.Circle progress={this.state.barProgress} size={145} thickness={20} unfilledColor="#11777744"              
                           direction="clockwise" color='#119977' strokeCap='round' borderWidth={0} showsText={true}
                           formatText={(progress)=>{return(Math.round(progress*this.state.duration))}}
                           textStyle={{fontSize:40,fontStyle:'italic',color:'#444444'}}
              /> 
                          :
              <Test.Circle progress={this.state.barProgress} size={145} thickness={20} unfilledColor="#11777744"
                           direction='counter-clockwise' color='#119977' strokeCap='round' borderWidth={0} showsText={true}
                           formatText={(progress)=>{return(this.state.duration-Math.round(progress*this.state.duration))}}
                           textStyle={{fontSize:40,fontStyle:'italic',color:'#444444'}}
              />     
             )
           )
   }

   manageTimeAll(){

      child=setInterval(()=>{
          this.setState({barProgress:this.state.barProgress+this.state.increment});
          if(this.state.barProgress<=0||this.state.barProgress>=1)
            {
                clearInterval(child)    

                timeOut= setTimeout(()=>{
                     this.setTimeOutFunction()    
                },300)
                         
            }            
      },this.state.duration*10);
   }  

   setTimeOutFunction(){                                                                                       
                  this.setState({numberOfCount:this.state.numberOfCount+(this.state.totalCount%2)})
                  this.setState({totalCount:this.state.totalCount+1})         
                  this.setState({breatheBool:3})                                                  
                  this.setState({timesCountString:'Times Count: '+this.state.numberOfCount})                                            
   }
   


   startButtonAction(){  
            this.setState({buttonTitle:'                            Stop                              ',})     
            this.setState({buttonStatus:true})
            this.setState({breatheBool:0})            
            this.setState({breathingTextStyle:{
                                                fontSize:28,
                                                color:'#666666',                              
                                                fontStyle:'italic',
                                                fontFamily:'times'
                                              }
                          })
            this.setState({timesCountString:'Times Count: 0'})  
            this.setState({increment:this.state.increProgressVal[this.state.initialProgress]})
            
            this.manageTimeAll()      

            root = setInterval(()=>{                       
                this.setState({initialProgress:(this.state.initialProgress+1)%2}) 
                this.setState({barProgress:this.state.initialProgress})   
                this.setState({increment:this.state.increProgressVal[this.state.initialProgress]})                                                          
                this.setState({breatheBool:this.state.totalCount%2})                                   
              
              this.manageTimeAll()

            }, (this.state.duration*1000+800))     
            
    }

    stopButtonAction(){                 
          clearInterval(child)
          clearInterval(root)
          if(typeof timeOut!== 'undefined')clearTimeout(timeOut)
          this.setState({buttonTitle:'                            Start                            ',
                         buttonStatus:false,
                         breatheBool:2,
                         totalCount:0,                         
                         timesCountString:'Previous number of spells: '+this.state.numberOfCount,                                                
                         breathingTextStyle:{
                            fontSize:19,
                            color:'#666666',       
                            fontStyle:'italic',   
                            fontFamily:'time'
                         },
                         barProgress:0,
                         initialProgress:0,
                         increment:0,
                         numberOfCount:0
                       })            
    }    

    
  render() {
    
    return (
      <View style={styles.container}>
          <View style={styles.firstView} width={this.width-30}>
              <TouchableOpacity style={styles.settings} onPress={()=>{this.setState({settingsModalVisible:true})
                                                                     if(this.state.buttonStatus==true) this.stopButtonAction() 
                                                                     }}
              >
                 <Icon name='settings-outline' size={24} color='#666666'/>                  
              </TouchableOpacity>

              <View style={styles.name}>
                <Text style={{fontFamily:'cursive', fontWeight:'bold', fontSize:26,color:'#11aaaa'}}>Happy Breathing</Text>
              </View>            
              
              <TouchableOpacity style={styles.about} onPress={()=>{this.setState({aboutModalVisible:true})
                                                                  if(this.state.buttonStatus==true) this.stopButtonAction()
                                                                     }}
              >
                <Icon name='information-outline' size={24} color='#666666'/>
              </TouchableOpacity>
          </View>
          <View style={styles.breathingInOutView} width={this.width-40}>
               <Text  style={this.state.breathingTextStyle}>{this.state.breatheInOut[this.state.breatheBool]}</Text> 
          </View>  

          <View style={styles.breathingTimerView}>               
               {this.timerViewRendering()}
          </View>      
          
          <View style={styles.countView}>
               <Text style={{fontSize:24,fontFamily:'cursive',}}> {this.state.timesCountString}  </Text>              
          </View>          
          <View style={styles.buttonView}>
            <Button title={this.state.buttonTitle} color='#11aaaa' onPress={()=>{
                                                                                 if(this.state.buttonStatus==false)
                                                                                    this.startButtonAction()
                                                                                 else this.stopButtonAction()  
                                                                                }}
            >                                                                           
            </Button>
          </View>
          
          <BreathModal modalProp={this.state.settingsModalVisible} modalBackPress={(val)=>{this.setState({settingsModalVisible:false})
                                                                                           this.setState({duration:val})
                                                                                          }}/>
          <AboutModal modalProp={this.state.aboutModalVisible} modalBackPress={()=>{this.setState({aboutModalVisible:false})}}/>
      </View>
    );
  }

}

const styles=StyleSheet.create({
    
    container:{
        flex:1,    
        alignItems:'center',
        backgroundColor:'#cccc77'  
    },
    firstView:{
        flex:.12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    name:{      
      flex:.8,    
      alignItems:'center'
    },
    settings:{
        flex:.1,        
        height:'100%',
        justifyContent:'center',
        alignItems:'center',            
    },
    about:{
        flex:.1,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',              
    },
    breathingInOutView:{
      flex:.2,     
      justifyContent:'center',   
      alignItems:'center',    
    },
    breathingTimerView:{
        flex:.36,   
        justifyContent:'center',     
        alignItems:'center',           
    },
    countView:{
        flex:.12,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },    
    buttonView:{
      flex:.2,
      justifyContent:'center',
      alignItems:'center',      
    },

})
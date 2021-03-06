import React, {Component} from 'react';
import {StyleSheet, Text, View,Button,TouchableOpacity,Dimensions,BackHandler,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Test from 'react-native-progress'
import Sound from 'react-native-sound'
import KeepAwake from 'react-native-keep-awake'
import AsyncStorage from '@react-native-community/async-storage'

import BreathModal from './breathModal'
import AboutModal from './aboutModal'


export default class Breath extends Component {

  constructor(props){
    super(props);        

    this.width = Dimensions.get('window').width
    this.w = this.width*.5    
    this.soundArray=["chinup.mp3","definite.mp3","graceful.mp3"]    

    this.getData('storageDuration') 
    this.getData('storageSound')
    
    this.state={                  
      breatheInOut:['Breath in','Breathe out','Tap the START button & breathe',''],
      breatheBool:2,
      buttonStatus: false,
      buttonTitle: '                            Start                            ',
      timesCountString: '',   
      numberOfCount:0,           
      initialProgress:0,      
      increProgressVal:[.03,-.03],    
      increment:0,
      barProgress:0,      
      settingsModalVisible:false,         
      aboutModalVisible:false,      
      breathingTextStyle:{
          fontSize:19,
          color:'#666666',       
          fontStyle:'italic',
          fontFamily:'time',          
      }
    }     
  }  


  onBackPress = () => {        
      Alert.alert(
        ' Exit From App ',
        ' Do you want to exit From App ?',
        [
          { text: 'Yes', onPress: () =>{this.stopButtonAction(); BackHandler.exitApp()  } },
          { text: 'No' }
        ],
        { cancelable: false },
      );      
      return true;
  }


  getData = async (getVal) => {
    try {
      const value = await AsyncStorage.getItem(getVal)      
      if(value !== null) {
         getVal==='storageDuration'
                    ?
         this.setState({duration:parseInt(value)}) 
                    :
         this.setState({rockstar : new Sound(this.soundArray[parseInt(value)], Sound.MAIN_BUNDLE)})
      }  
      else{
            if(getVal==='storageDuration'){
                       this.setState({duration:8});
                       await  AsyncStorage.setItem(getVal, '8')
            }
            else{
                      this.setState({rockstar: new Sound(this.soundArray[1],Sound.MAIN_BUNDLE)});
                      await AsyncStorage.setItem(getVal,'1')
            }        
      }          
    } 
    catch(e) {
      // error reading value
    }
  }

  modalBackPressAction(){  
      this.getData('storageDuration')    
      this.getData('storageSound')  
      this.setState({                                         
                    settingsModalVisible:false,                 
                  })                   
  }

   timerViewRendering(){
     return(
              this.state.buttonStatus==false
                          ? 
              
              <Text style={{fontSize:100,fontFamily:'cursive',color:'#305f5f'}}> {this.state.duration} sec </Text>             
                          :
            ( this.state.initialProgress===0 
                          ?
              <Test.Circle progress={this.state.barProgress} size={145} thickness={20} unfilledColor="#11777744"              
                           direction="clockwise" color='#119977' strokeCap='round' borderWidth={0} showsText={true}
                           formatText={(progress)=>{return(Math.round(progress*this.state.duration))}}
                           textStyle={{fontSize:36,fontStyle:'italic',color:'#444444'}}
              /> 
                          :
              <Test.Circle progress={this.state.barProgress} size={145} thickness={20} unfilledColor="#11777744"
                           direction='counter-clockwise' color='#119977' strokeCap='round' borderWidth={0} showsText={true}
                           formatText={(progress)=>{return(this.state.duration-Math.round(progress*this.state.duration))}}
                           textStyle={{fontSize:36,fontStyle:'italic',color:'#444444'}}
              />     
             )
           )
   }

   manageTime(){         
    
            timeOut= setTimeout(()=>{                                                                                                                     
                          this.setState({numberOfCount:this.state.numberOfCount+(this.state.initialProgress)})                                                                    
                          this.setState({timesCountString:'Times Count: '+this.state.numberOfCount,
                                        breatheBool:3,                                                           
                                        })                                  
                          this.state.rockstar.play()     
            },(this.state.duration*1000)+300)
            
            
            child=setInterval(()=>{                   
                  if(this.state.barProgress>=0 && this.state.barProgress<=1){                                    
                          this.setState({barProgress:this.state.barProgress+this.state.increment})            
                  }        
                  else
                      {                                                     
                          clearInterval(child)                                                        
                      }                      
              },this.state.duration*30);
    }     
   


   startButtonAction(){   

            this.setState({buttonTitle:'                            Stop                              ',
                           buttonStatus:true,
                           breatheBool:0,
                           breathingTextStyle:{
                                                fontSize:28,
                                                color:'#666666',                              
                                                fontStyle:'italic',
                                                fontFamily:'times'
                                              },
                           timesCountString:'Times Count: 0', 
                           increment:this.state.increProgressVal[this.state.initialProgress]                                             
            })                 
            BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
            
            this.manageTime()      

            root = setInterval(()=>{    
                                                             
                this.setState({initialProgress:(this.state.initialProgress+1)%2})                 
                this.setState({breatheBool:this.state.initialProgress,
                               barProgress:this.state.initialProgress,
                               increment:this.state.increProgressVal[this.state.initialProgress],
                              })                                                                
              
              this.manageTime()

            }, (this.state.duration*1000+1000))     
            
    }

    stopButtonAction(){ 
          BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);    
          KeepAwake.deactivate()            
          clearInterval(child)
          clearInterval(root)
          clearTimeout(timeOut)          
          this.setState({buttonTitle:'                            Start                            ',
                         buttonStatus:false,
                         breatheBool:2,                                           
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
                <Text style={{fontFamily:'cursive', fontWeight:'bold', fontSize:28,color:'#11aaaa'}}>Happy Breathing</Text>
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
                                                                                    {this.startButtonAction()
                                                                                     KeepAwake.activate()
                                                                                    }
                                                                                 else this.stopButtonAction()  
                                                                                }}
            >                                                                           
            </Button>
          </View>
          
          <BreathModal modalProp={this.state.settingsModalVisible} modalBackPress={()=>{ this.modalBackPressAction()}}/>
          <AboutModal modalProp={this.state.aboutModalVisible} modalBackPress={()=>{this.setState({aboutModalVisible:false})}}/>
      
      </View>      
    );
  }

}

const styles=StyleSheet.create({
    
    container:{
        flex:1,    
        alignItems:'center',
        backgroundColor:'#ffffbb'  
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
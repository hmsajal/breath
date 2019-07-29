import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import BreathModal from './breathModal'
import AboutModal from './aboutModal'
import Progress from './progress'

export default class Breath extends Component {
  
  constructor(props){
    super(props);
    this.state={      
      breatheInOut:['Breath in','Breathe out','Tap the START button & breathe',''],
      breatheBool:2,
      buttonStatus: false,
      buttonTitle: '                            Start                            ',
      timesCountString: 'Times Count',   
      numberOfCount:0,   
      totalCount:0,    
      iniProgressVal:0,  
      increProgressVal:[.01,-.01],
      settingsModalVisible:false,         
      aboutModalVisible:false,
      progressCompVar:<View/>,
      breathingTextStyle:{
          fontSize:19,
          color:'#666666',       
          fontStyle:'italic',
          fontFamily:'time',          
      }
    }
    this.barStart=this.barStart.bind(this)
  }  
  progressInstance = new Progress()

  barStart(){

  }
    startButtonAction(){      

            this.setState({buttonTitle:'                            Stop                              ',
                           buttonStatus:true,breatheBool:0,numberOfCount:0,                                                   
                           breathingTextStyle:{
                              fontSize:28,
                              color:'#666666',                              
                              fontStyle:'italic',
                              fontFamily:'times'
                            }
                          })      
            this.setState({timesCountString:'Times Count: 0'})  
            this.setState({progressCompVar:<Progress/>})            

            timeOut = setTimeout(()=>
              {                                                                                          
                  this.setState({numberOfCount:this.state.numberOfCount+this.state.totalCount%2,   
                                totalCount:this.state.totalCount+1,breatheBool:3,                                
                                }) 
                  this.setState({timesCountString:'Times Count: '+this.state.numberOfCount})                                                            
              },  10300);

            root = setInterval(()=>{
                this.setState({iniProgressVal:this.state.iniProgressVal+1})                 
                this.setState({breatheBool:this.state.totalCount%2})

                this.progressInstance.mountFunc(this.state.iniProgressVal%2,this.state.increProgressVal[this.state.iniProgressVal%2])
                

                timeOut = setTimeout(()=>
                  {                                                                
                      this.setState({numberOfCount:this.state.numberOfCount+this.state.totalCount%2,   
                                    totalCount:this.state.totalCount+1,breatheBool:3,                                    
                                    })  
                      this.setState({timesCountString:'Times Count:  '+this.state.numberOfCount})                                                               
                  },  10300)              
            }, 11000)                      
    }

    stopButtonAction(){
                    
          clearInterval(root)
          clearTimeout(timeOut)          
          this.setState({buttonTitle:'                            Start                            ',
                         buttonStatus:false,breatheBool:2,totalCount:0,                         
                         timesCountString:'Previous number of spells: '+this.state.numberOfCount,
                         progressCompVar:<View/>,                         
                         breathingTextStyle:{
                            fontSize:19,
                            color:'#666666',       
                            fontStyle:'italic',   
                            fontFamily:'time'
                         },
                         iniProgressVal:0
                       })            
    }    

    
  render() {
    const {height,width}=Dimensions.get('window')
    const w=width
    return (
      <View style={styles.container}>
          <View style={styles.firstView} width={w-30}>
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
          <View style={styles.breathingInOutView} width={w-40}>
               <Text  style={this.state.breathingTextStyle}>{this.state.breatheInOut[this.state.breatheBool]}</Text> 
          </View>  

          <View style={styles.breathingTimerView}> 
               {this.state.progressCompVar}
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
          
          <BreathModal modalProp={this.state.settingsModalVisible} modalBackPress={()=>{this.setState({settingsModalVisible:false})}}/>
          <AboutModal modalProp={this.state.aboutModalVisible} modalBackPress={()=>{this.setState({aboutModalVisible:false})}}/>
      </View>
    );
  }

}

const styles=StyleSheet.create({
    
    container:{
        flex:1,    
        alignItems:'center',
        // backgroundColor:'#cccc77'  
        backgroundColor:'#ffffff'
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
    }

})
import React,{Component} from 'react'
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity,Dimensions} from 'react-native'

export default class Timer extends Component {

    render(){

        return(
            <View style={styles.breathingTimerView}>
                <Text  style={{fontSize:36,fontFamily:'times'}}>{this.state.count}</Text>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    
    breathingTimerView:{
        flex:.36,   
        justifyContent:'center',     
        alignItems:'center',           
    },

 }
)
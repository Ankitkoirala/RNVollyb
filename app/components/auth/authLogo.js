import React from 'react';
import {ScrollView,ActivityIndicator, StyleSheet, Image, View,Animated} from 'react-native';

import LogoImage from '../../assets/images/Logo.png'

export default class LogoComponent extends React.Component{
    constructor(){
        super();

        this.redsquare = new Animated.ValueXY(0,0);
    }
    componentDidMount(){
            Animated.spring(this.redsquare,{
                toValue:{x:80,y:-5}
            }).start();
    }

render(){
    return(
        <Animated.View
        style={{
            left:this.redsquare.x,
            top:this.redsquare.y
        }}>
        <Image
         source={LogoImage}
        //  resizeMode={'center'}
        style={{
            marginTop:80,
            width:200,
            height:100,
        }}/>

        </Animated.View>
    )
}
}

const styles = StyleSheet.create({
    square: {
      flex: 1,
      width:100,
      height:100,
      backgroundColor: 'red',
    },
})



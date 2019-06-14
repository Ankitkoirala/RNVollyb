import React, {Component} from 'react';
import {
     StyleSheet,
      Text, 
      View,
      TextInput} from 'react-native';

      const input=(props)=>{
          let templete=null;

          switch (props.type){
              case 'textinput':
                templete=
                <TextInput
                    {...props}
                    style={[styles.input,props.overrideStyle]}
                    textAlignVertical={'center'}
                />

              break;
              default:
                  
          return templete
          }

          return templete
      }
      const styles = StyleSheet.create({
        input: {
          width:'80%',
          borderBottomColor: '#eaeaea',
          paddingBottom: 10,
            marginLeft: 35,
            color:'#fff',
         borderBottomWidth: 2,
          fontSize:15,
          padding: 5,
        },
      });
      

      export default input;
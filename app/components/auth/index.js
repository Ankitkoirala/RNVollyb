/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView,ActivityIndicator,
     StyleSheet,
      Text, 
      View,
      ImageBackground,
      Dimensions,
      Button} from 'react-native';

import AuthLogo from './authLogo'
import AuthForm from './authForm';
import {connect} from 'react-redux'
import {autoSignIn} from '../../store/actions/user_actions';
import {bindActionCreators} from 'redux';

import {getTokens,setTokens} from '../../utils/misc'

 class AuthComponent extends Component{

    state={
        loading:true
    }

    goNext=()=>{
      this.props.navigation.navigate('App')
    }

    componentDidMount(){                               //GET TOKENS
      getTokens((value)=>{
        if(value[0][1]===null){
          this.setState({loading:false})
        } else{
          this.props.autoSignIn(value[1][1]).then(()=>{
            if(!this.props.User.auth.token){
              this.setState({loading:false})
            }else{
              setTokens(this.props.User.auth,()=>{
                this.goNext();
              })
            }
          })
        }
      })
    }

  render() {
        if(this.state.loading){
            return(
                <View style={styles.loadinga}>
                    <ActivityIndicator/>
                </View>
            )
        }else{
            return (
                <ImageBackground 
                source={require('../../assets/images/volly.jpg')}
                 style={[styles.fixed,styles.container]} 
                 blurRadius={0.5}>
                
                <ScrollView style={[styles.fixed,styles.scrollview]}> 
                  <AuthLogo/>   
                   <AuthForm goNext={this.goNext}/>        
                </ScrollView>
                </ImageBackground>
              );
        }
  }
}

const styles = StyleSheet.create({
    containter: {
     
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height //for full screen
      },
      fixed: {
        // flexDirection: 'column',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      scrollview: {
        backgroundColor: 'transparent'
      },
  loadinga:{
        flex:1,
        backgroundColor:'#fff',
        alignItems: 'center',
        justifyContent: 'center',
  },
  basketball:{
      flex: 1,
   alignItems:'center',
   justifyContent:'center',
  }
 
});

function mapStateToProps(state){
  return{
      User:state.User
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({autoSignIn},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthComponent);


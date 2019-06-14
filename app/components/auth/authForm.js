import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';

import Input from '../../utils/forms/input'

import ValidationRules from '../../utils/forms/validationrules'

import {connect} from 'react-redux'
import {signUp,signIn} from '../../store/actions/user_actions';
import {bindActionCreators} from 'redux';
import {setTokens} from '../../utils/misc'


class AuthForm  extends Component{

    state={
        type:'Login',
        action:'Login',
        actionMode:'Register Here',
        hasErrors:false,
        form:{
            email:{
                value:'',
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                    isEmail:true
                }
            },
            password:{
                value:'',
                valid:false,
                type:"textinput",
                rules:{
                    isRequired:true,
                   minLength:6,
                }
            },
            confirmPassword:{value:'',
            valid:false,
            type:"textinput",
            rules:{
                confirmPass:'password',
            }}
        }

    }

    formHasErrors=()=>(
        this.state.hasErrors ?
            <View style={styles.errorContainer}>
                <Text  style={styles.errorLabel}> Check Info</Text>
            </View>
        :null
    )

    confirmPassword=()=>(
        this.state.type !='Login' ?
        <Input
        placeholder='Confirm Password'
        placeholderTextColor="#cecece"
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText={value=>this.updateInput('confirmPassword',value)}
        secureTextEntry
        />
        :null
    )

    changeFormType=()=>{
        const type = this.state.type;

        this.setState({
            type:type === 'Login' ? 'Register':'Login',
            action:type === 'Login' ? 'Register':'Login',
            actionMode:type === 'Login' ? 'I want to Login':'Register Here'
        })
    }
    

    updateInput=(name,value)=>{

        this.setState({
            hasErrors:false
        });
        let formCopy = this.state.form;

        formCopy[name].value=value;

        //rules
        let rules =   formCopy[name].rules;
        let valid = ValidationRules(value,rules,formCopy);

        
        formCopy[name].valid = valid


        this.setState({
            form:formCopy
        })
    }

    manageAccess=()=>{
        if(!this.props.User.auth.uid){
            this.setState({hasErrors:true})

        }else{
                setTokens(this.props.User.auth,()=>{
                    this.setState({hasErrors:false})
                    this.props.goNext();
                })
        }
    }

    submitUser=()=>{
            let isFormValid =true;
            let formToSubmit = {};

            const formCopy = this.state.form;

            for(let key in formCopy){
                if(this.state.type==='Login'){
                    //Login
                    if(key !== 'confirmPassword'){
                        isFormValid = isFormValid && formCopy[key].valid;
                        formToSubmit[key]=formCopy[key].value;

                    }

                }else{
                    //REGISTER
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key]=formCopy[key].value;
                }
            }

            if(isFormValid){
                if(this.state.type === 'Login'){

                    this.props.signIn(formToSubmit).then(()=>{
                        this.manageAccess()
                    })
                }else{
                    this.props.signUp(formToSubmit).then(()=>{
                        this.manageAccess()
                    })
                }

            }else{
                this.setState({
                    hasErrors:true
                })
            }
    }



    render(){
        return(
            <View>
            

                <Input
                placeholder='Enter Email'
                placeholderTextColor="#cecece"
                autoCapitalize={'none'}
                type={this.state.form.email.type}
                value={this.state.form.email.value}
                keyboardType={'email-address'}
                onChangeText={value=>this.updateInput('email',value)}
                />

                <Input
                placeholder='Enter Password'
                placeholderTextColor="#cecece"
                type={this.state.form.password.type}
                value={this.state.form.password.value}
                onChangeText={value=>this.updateInput('password',value)}
                secureTextEntry
                />

                {this.confirmPassword()}

                {this.formHasErrors()}

                <View
                    style={{marginTop:30}} >
                        <View style={styles.button}>
                            <TouchableOpacity onPress={this.submitUser}
                            style={styles.SubmitButtonStyle}> 
                            <Text style={styles.TextStyle}>{this.state.action}</Text>
                            
                            </TouchableOpacity>

                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity  onPress={this.changeFormType}style={styles.registerHereButton}> 
                           <Text  style={styles.registerText}>
                            {this.state.actionMode}
                            </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity  onPress={()=>this.props.goNext()}>

                            <Text style={styles.skipLogin}> I will do it later</Text>
                           
                            </TouchableOpacity> 

                        </View>


                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    errorContainer: {
        width:'70%',
        marginLeft: 35,
    marginBottom:10,
    marginTop:30,
    padding:10,
    backgroundColor:'red'
    },
     errorLabel:{ 
      color:'#fff',
      textAlignVertical:'center',
      textAlign:'center'
     },
     SubmitButtonStyle: {
        opacity: 0.8,
        paddingTop:10,
        paddingBottom:10,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#800000',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#000'
      },
      TextStyle:{
        color:'#fff',
        textAlign:'center',
        fontFamily: 'Roboto-Bold',
    },
    registerHereButton:{
        paddingTop:10,
        opacity: 0.8,
        paddingBottom:10,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#800000',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#000'
      },
      registerText:{
        color:'#fff',
        textAlign:'center',
        fontFamily: 'Roboto-Bold',
      },
      skipLogin:{
        color:'#fff',
        textAlign:'center',
        fontSize:15,
        fontFamily: 'Roboto-Bold',
      },
   
     button:{
         ...Platform.select({
             ios:{
                 marginBottom:0
             },
             android:{
                width: '80%',
                // height: '30%',
                // justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                marginBottom:10,
                // backgroundColor:'#800000'
             }
         })
        
     },
     button2:{
        width: '50%',
        paddingTop: 5,
        alignSelf: 'center',
     }
  });

  function mapStateToProps(state){
      return{
          User:state.User
      }
  }

  function mapDispatchToProps(dispatch){
      return bindActionCreators({signIn,signUp},dispatch);
  }

 export default connect(mapStateToProps,mapDispatchToProps)(AuthForm);
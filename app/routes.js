import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import  Ionicons from 'react-native-vector-icons/Ionicons'
import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';

// SCREENS

import SignIn from './components/auth';
import News from './components/news';
import Games from './components/games';
import Article from './components/news/articles';
import GamesArticle from './components/games/article';
import Logo from './utils/logo';

const headerConf ={
    headerLayoutPreset:'center',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#8B2600'
        },
        headerTintColor:'white',
        headerTitle:Logo
    }
}

const NewsStack = createStackNavigator({
    News:News,
    Article:Article
},headerConf
);
const GameStack = createStackNavigator({
    Games:Games,
    Article:GamesArticle
},headerConf)



const AppStack = createBottomTabNavigator({
    News:NewsStack,
    Games:GameStack,
    
},{
    tabBarOptions:{
        activeTintColor:'#fff',
        showLabel:false,
        activeBackgroundColor:'#8B2600',
        inactiveBackgroundColor:'#7d2c0e',
        // style:{
        //         backgroundColor:'red'
        // }
    },
    initialRouteName:'News',
    defaultNavigationOptions:({navigation})=>({
        tabBarIcon:({focused,horizontal,tintColor})=>{
            const {routeName} = navigation.state;
            let iconName;
                if(routeName ==='News'){
                    iconName=`ios-basketball`;
                }else if(routeName ==='Games'){
                    iconName='md-tv'
                }

            return <Ionicons name={iconName} size={25} color={tintColor}/>;
        }
    })
});

const AuthStack = createStackNavigator({
    SignIn:SignIn
},{
    headerMode:'none'
});

export const  RootNavigator = ()=>{
    return createAppContainer(createSwitchNavigator({

        App:AppStack,
        Auth:AuthStack

    },{
        initialRouteName:'Auth'
    }))
}

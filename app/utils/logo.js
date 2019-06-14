

import React, {Component} from 'react';
import {Image} from 'react-native';


import LogoImg from '../assets/images/Logo.png'
 const LogoTitle =()=>(
     <Image
     
        source={LogoImg}
        style={{width:70,height:65}}
        resizeMode='contain'/>
 )
export default LogoTitle;

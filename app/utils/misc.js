
import AsyncStorage from '@react-native-community/async-storage';

export const FIREBASEURL = `https://rn-project-app.firebaseio.com`;
export const APIKEY= `AIzaSyD7CbKULjkbEfsfRagLWehonGM9tfnNTLM`;


export const SIGNUP=`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;

export const SIGNIN=`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;

export const REFRESH =`https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const getTokens =(cb)=>{
    AsyncStorage.multiGet([

    '@projectone@token',
        '@projectone@refreshToken',
    '@projectone@expireToken',
    '@projectone@uid',
        

    ]).then(value=>{
        cb(value);
    });
}

export const setTokens=(values,cb) => {
    const dateNow = new Date();

    const expiration = dateNow.getTime() + (3600*1000);

    AsyncStorage.multiSet([

        ['@projectone@token',values.token],
        ['@projectone@refreshToken',values.refToken],
        ['@projectone@expireToken',expiration.toString()],
        ['@projectone@uid',values.uid]
        

    ]).then(response=>{
        cb();
    })
}

export const convertFirebase = (data) =>{
    const newData=[];

    for(let key in data){
        newData.push({
            ...data[key],
            id:key
        })
   }

   return newData;
}

export const findTeamData = (itemId,teams)=>{
    const value =teams.find((teams)=>{
            return teams.id === itemId

    })
    return value;
}
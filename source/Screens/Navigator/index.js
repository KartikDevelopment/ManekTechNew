import React, { useContext, useEffect,useState, useRef } from 'react';
import {
  Platform, View, Image, Alert,Linking,AppState,Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestScreen from '../TestScreen';
import Routes from './Routes';
import { connect  } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import HomeScreen from '../HomeScreen/index.js';
import Login from '../LoginScreen/index.js';
import Maps from '../Maps/index.js';
import { getAsyncStorage } from '../../utils/asyncStorage';
import { UserLoggedIn } from '../../Redux/actions/AuthAction';
const AppNavigator = (props)=>{
    const Stack = createNativeStackNavigator();
    
    useEffect(()=>{
        getAsyncStorage("IsLoggedIn").then((data)=>{
            if(JSON.parse(data)){
                props.UserLogin(true);
                if(Platform.OS=="android"){
                    setTimeout(() => SplashScreen.hide(), 1000);
                }
            }
            console.log(data)
        })
    },[])
    
        
    
    useEffect(()=>{
        console.log(props.isLoggedIn)
     
    },[props.isLoggedIn])
    useEffect(()=>{
        
        if(Platform.OS=="android"){
            setTimeout(() => SplashScreen.hide(), 1000);
        }
    },[props.isLoggedIn])
    const routeNameRef = React.useRef();
    const navigationRefs = React.createRef();
    const HandleRoute = (ref)=>{
        navigationRefs.current = ref;
       
    }
    return(
        <NavigationContainer
            ref={HandleRoute}
            onReady={() => {
                routeNameRef.current = navigationRefs.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                // console.log('screen changed');
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRefs.current.getCurrentRoute().name;
                routeNameRef.current = currentRouteName;
            }}
        >
           {props.isLoggedIn?
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={Routes.Home}>
                <Stack.Screen name={Routes.Home} component={HomeScreen} />
                <Stack.Screen name={Routes.Maps} component={Maps} />
               
            </Stack.Navigator>
            :
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={Routes.LOGIN}>
                <Stack.Screen name={Routes.LOGIN} component={Login} />
            </Stack.Navigator>
            }
        </NavigationContainer>
    )
}
const mapStateToProps = (state) => ({ 
    isLoggedIn:state.Auth.auth.isLoggedIn,
  })
  const mapDispatchToProps = (dispatch) => ({
    UserLogin: (data)=>dispatch(UserLoggedIn(data)),
  })
export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
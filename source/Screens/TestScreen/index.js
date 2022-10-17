
 import React, { useEffect } from 'react'
 import {
   Text,
   View,
 } from 'react-native';
import { connect } from "react-redux";
import { GetRestaurantLists } from '../../Redux/actions/restaurantListAction';
import { UserLoggedIn } from '../../Redux/actions/AuthAction';
import { getAsyncStorage } from '../../utils/asyncStorage';
 const App= (props) => {
    getAsyncStorage("IsLoggedIN").then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    useEffect(()=>{
      //props.UserLoggedIN()
      console.log(props)
    },[])

    return (
    <View style={{flex:1}}>
        <Text style={{marginTop:100}}>{props.count}</Text>
    </View>
   );
 };
 const mapStateToProps = (state) => ({ 
  count : state.test.count,
})
const mapDispatchToProps = (dispatch) => ({
  GetList:()=> dispatch(GetRestaurantLists()),
  UserLoggedIN: ()=> dispatch(UserLoggedIn()),
})
 export default connect(mapStateToProps, mapDispatchToProps)(App);
 
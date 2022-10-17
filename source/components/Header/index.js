import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import scaling from '../../utils/normalize'
import {IMAGES} from '../../utils/images'
const Header=({title='',onPressBack=()=>{},isVisibleBack=false})=>{
    
    return (
        <View style={styles.parent}>
          {isVisibleBack?
          <Text onPress={onPressBack} style={styles.Back}>Back</Text>
          :<Text> </Text>}
          <Text style={styles.title}>{title}</Text>
          <Text> </Text>
        </View>
    )
}
const styles=StyleSheet.create({
    parent:{
        backgroundColor:'rgb(106,218,153)',
        justifyContent:'space-between',
        flexDirection:'row',
        width:'100%',
        height:scaling.heightScale(40),
        //marginBottom:scaling.heightScale(10)
    },
    title:{
        alignSelf:'center',
        fontWeight:"bold",
        fontSize:scaling.heightScale(20),
        color:'black'
    },
    Back:{
        alignSelf:'center',
        fontWeight:"400",
        fontSize:scaling.heightScale(10),
        color:'white',
        left:'35%'
    }
})
export default Header;
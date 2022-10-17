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
const Stars=({rating=0})=>{
    const length=5
    const [arr,setArr] = useState([]);
    for(var i=0;i<length && arr.length<length;i++){
        if(i<rating ){
            arr.push(
                <Image style={{width:scaling.heightScale(10),margin:scaling.widthScale(3),height:scaling.heightScale(10)}} source={IMAGES.STAR_FILL}/>
            )
        }else{
            arr.push(
                <Image style={{width:scaling.heightScale(10),margin:scaling.widthScale(3),height:scaling.heightScale(10)}} source={IMAGES.STAR_EMPTY}/>
            )
        }
    }
   
    return (
        <View style={{flexDirection:'row'}}>
            {arr.map((item)=>{
                return item
            })}
        </View>
    )
}
export default Stars;
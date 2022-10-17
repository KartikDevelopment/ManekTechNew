import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import scaling  from '../../utils/normalize'
import MapViewDirections from 'react-native-maps-directions';
import MapView , { Marker }from 'react-native-maps';
import { IMAGES } from '../../utils/images';
const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBZYKXJFxtF-jS74pCvGly7bVGoeeE2ZPA';
import Header from '../../components/Header';
import Stars from '../../components/Stars';
const Maps =(props)=>{
    const [region ,setRegion] = useState({
      latitude: parseFloat(props.route.params.latitude),
      longitude: parseFloat(props.route.params.longitude),
      latitudeDelta: 0,
        longitudeDelta: 0.05,
    })
    const [descAvailable,setDesc] = useState(true)
    const Description = (item)=>{
        console.log(item)
        return (
            <View style={styles.DescriptionView}>
                <Image style={styles.MAP_IMG} source={IMAGES.MAP_IMG}/>
                <View>
                <View style={styles.Title}>
                    <Text style={styles.TitleText} key={item.item.id}>{item.item.title}</Text>
                    <Stars rating={item.item.rating}/>
                </View>
                </View>
            </View>
        )
    }
    const onRegionChange=(region = 
        {latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0,
        longitudeDelta: 0.05,
        })=> {
        setRegion({
          ...region
        });
    }
    console.log(props.route.params.latitude)
    return(
        <>
        <Header title='Maps' isVisibleBack={true} onPressBack={()=>{props.navigation.goBack()}}/>
        
        <View style={{flex:1}}>
        
        <MapView
            style={styles.map}
            initialRegion={region}
            loadingEnabled
            region={region}
            onRegionChangeComplete={(region) => onRegionChange(region)} 
            >
           
            <Marker
            coordinate={{
                latitude: parseFloat(props.route.params.latitude),
                longitude: parseFloat(props.route.params.longitude),
            }}
            onPress={()=>{setDesc(!descAvailable)}}
            style={{justifyContent:'center',alignContent:'center'}}
            >
                {descAvailable
                ?
                <Description item={props.route.params}/>
                :null
                }
                <View style={{alignSelf:'center'}}>
                    <Image style={styles.ShopMarker} source={IMAGES.SHOP_PIN}/>
                </View>
                
            </Marker>
                {/* <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                /> */}
            
            </MapView>
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    ShopMarker:{
        width:scaling.heightScale(33),
        height:scaling.heightScale(42),
    },
    DescriptionView:{
        width:scaling.widthScale(200),
        height:scaling.heightScale(50),
        backgroundColor:'white',
        borderRadius:scaling.heightScale(10),
        flexDirection:'row',
        elevation:10,
        marginBottom:scaling.heightScale(5)
    },
    MAP_IMG:{
        width:scaling.heightScale(30),
        height:scaling.heightScale(30),
        alignSelf:'center',margin:scaling.widthScale(10)
    },
    Title:{
       
        height:scaling.heightScale(50),
        justifyContent:'center'
    },
    TitleText:{
        fontSize:scaling.heightScale(10),
        fontWeight:"800",
        color:'black'
    }

})
export default Maps;

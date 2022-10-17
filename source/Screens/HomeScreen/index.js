
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
import Stars from '../../components/Stars';
import { connect } from "react-redux";
import MapView from 'react-native-maps';
import {IMAGES} from '../../utils/images'
import scaling from '../../utils/normalize'
import { GetRestaurantLists } from '../../Redux/actions/restaurantListAction';
import { UserLoggedIn } from '../../Redux/actions/AuthAction';
import Loader from '../../components/Loader';
import { getAsyncStorage } from '../../utils/asyncStorage';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import MapViewDirections from 'react-native-maps-directions';
import Routes from '../Navigator/Routes';
 const App= (props) => {
    const [page,setPage] = useState(0)
    const [listItems,setListItems] = useState([]);
    useEffect(()=>{
      if(!props.persistant){
        console.log("thisisCalled")
        props.GetList()
      }
      // console.log("thisisCalled2")
      // console.log(props.data)
      // console.log(props.persistant)
    },[])
    const ItemView=(item,index)=>{
      return (
        <View style={styles.item}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
            <Image style={styles.SqrImg} source={IMAGES.ITEM_IMAGE_SQUARE}/>
            <View style={styles.Title}>
              <Text style={styles.TitleText} key={item.id}>{item.title}</Text>
              <Stars rating={item.rating}/>
            </View>
            <TouchableOpacity onPress={()=>{props.navigation.navigate(Routes.Maps,{...item})}} style={styles.mapBackGround}>
              <Image style={{width:scaling.heightScale(22),alignSelf:'center',height:scaling.heightScale(30)}} source={IMAGES.MAP}/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    const PageHandler=(operation=0)=>{
      console.log(props.data.length)
      if(page+operation>=0 && (props.data.length-1)/((page+operation)*10)>1){
        Alert.alert("Page Number",JSON.stringify(page+operation))
        setPage(page+operation)
      }else{
        Alert.alert("Error","No Item")
      }
    }
    const PageButton =()=>{
      return (
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
          <Text onPress={()=>{PageHandler(-1)}} style={styles.PageText}>
            Previous Page
          </Text>
          <View style={{height:'100%',width:3,backgroundColor:'black'}}/>
          <Text onPress={()=>{PageHandler(+1)}} style={styles.PageText}>
            Next Page
          </Text>
        </View>
      )
    }
    useEffect(()=>{
      if(props.data.length !== 0){
        setListItems(props.data.slice(page*10,(page*10)+10))
      }
    },[page,props.data])
    useEffect(()=>{
      console.log('thisIsListItems'+listItems.length)
      console.log(listItems)
    },[listItems])
    return (
    <SafeAreaView style={{flex:1,}}>
    {props.loading?
    <Loader/>
      :
    <View style={{flex:1,flexDirection:'column',}}>
      <Header title="Restaurant List" onPressBack={()=>{}}/>
      <ScrollView style={{height:'90%',width:'100%',paddingTop:scaling.heightScale(5)}}>
        {listItems.map((item,index)=>{
         return(ItemView(item,index) )
        })}
      </ScrollView>
      <View style={{height:'10%',width:'100%'}}>
        <PageButton/>
      </View>
    </View>}
    
    </SafeAreaView>
   );
 };
 const styles = StyleSheet.create({
  item:{
    width:'90%',
    height:scaling.heightScale(50),
    alignSelf:'center',
    backgroundColor:'white',
    margin:scaling.heightScale(5),
    overflow:'hidden',
    borderRadius:scaling.heightScale(10),
    elevation:10
  },
  SqrImg:{
    height:scaling.heightScale(40),
    width:scaling.heightScale(40),
    alignSelf:'center',
    margin:scaling.heightScale(5),
    borderRadius:scaling.heightScale(5)
  },
  Title:{
    width:'40%',
    height:scaling.heightScale(50),
    justifyContent:'center'
  },
  PageText:{
    alignSelf:'center',
    fontSize:scaling.heightScale(10),
    color:'black',
    fontWeight:"600"
  },
  mapBackGround:{
    backgroundColor:'rgb(106,218,153)',
    justifyContent:'center',
    alignSelf:'center',
    width:scaling.heightScale(40),
    height:scaling.heightScale(40),
    margin:scaling.heightScale(5),
    borderRadius:scaling.heightScale(5)
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  TitleText:{
    fontSize:scaling.heightScale(10),
    fontWeight:"800",
    color:'black'
  }
})
 const mapStateToProps = (state) => ({ 
  count : state.test.count,
  loading: state.test.loading,
  data: state.test.ListData,
  persistant: state.test.persistant,
})
const mapDispatchToProps = (dispatch) => ({
  GetList:()=> dispatch(GetRestaurantLists()),
  UserLoggedIN: ()=> dispatch(UserLoggedIn()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
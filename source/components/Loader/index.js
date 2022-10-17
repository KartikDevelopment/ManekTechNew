import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";
export default function Loader() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', zIndex: 500,}}>
      <LottieView
        source={require("../../assets/Loader/loader.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
  },
});
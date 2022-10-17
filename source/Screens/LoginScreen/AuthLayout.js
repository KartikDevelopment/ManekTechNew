import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";

import {Screen} from "../screen/screen"
import { IMAGES } from "../../utils/images";
import { WHITE } from "../../utils/colors";
const AuthLayout = ({ children, title = "" }) => {
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Screen style={styles.screenStyles}>
        <ScrollView contentContainerStyle={styles.scrollViewStyles}>
          <View style={styles.logoDiv}>
            <Image style={styles.logo} source={IMAGES.LOGO} />
          </View>
          {title != "" && <Text style={styles.text}>{title}</Text>}
          {children}
        </ScrollView>
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  screenStyles: {
    backgroundColor: WHITE,
    paddingHorizontal: 30,
  },
  scrollViewStyles: { flexGrow: 1, justifyContent: "center" },
  logoDiv: {
    width: 160,
    height: 60,
    alignSelf: "center",
    marginBottom: "20%",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

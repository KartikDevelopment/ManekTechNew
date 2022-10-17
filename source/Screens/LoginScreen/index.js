import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Button } from "react-native-paper";
import * as yup from "yup";
import { UserLoggedIn } from "../../Redux/actions/AuthAction";
import { DARK_YELLOW,LIGHT_YELLOW } from "../../utils/colors";
import CustomTextInput from "../../components/TextInput";
import AuthLayout from "./AuthLayout";
import { useDispatch, useSelector } from "react-redux";
import { setAsyncStorage } from "../../utils/asyncStorage";
import { eventNames } from "npm";
import env from "../../../env.json"
const Login = () => {
 const navigation = useNavigation();
 const dispatch = useDispatch();
 const auth = useSelector((state)=> state.Auth.auth);
 useEffect(()=>{
  console.log(JSON.stringify(auth))
 })
  let schema = yup.object().shape({
    email: yup.string().required("Email id is required"),
    password: yup.string().required("Password is required"),
  });
  useEffect(()=>{
   
  },[])
  
  const handleLogin = (values) => {
    let formdata = new FormData();
    
    formdata.append("email", values.email);
    formdata.append("password", values.password);
    if((values.email).toLowerCase() == env.DUMMY_LOGIN.id.toLowerCase()
       && values.password == env.DUMMY_LOGIN.password){
      setAsyncStorage("IsLoggedIn",JSON.stringify(true));
      setAsyncStorage("Id",JSON.stringify(values.email));
      setAsyncStorage("Password",JSON.stringify(values.password))
      .then(()=>{
        dispatch(UserLoggedIn(true))
      }).catch(()=>{
        setAsyncStorage("IsLoggedIn",JSON.stringify(false));
        dispatch(UserLoggedIn(false))
      })
    }else{
      Alert.alert("Failed","Email id or password doesnt match")
      console.log("Error")
    }
   // dispatch(login(formdata));
  };

  return (
    <AuthLayout title="Login">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={schema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <View>
            <CustomTextInput
              label="Email id"
              name="email"
              handleChange={handleChange}
              values={values}
              handleBlur={handleBlur}
              errors={errors}
            />

            <CustomTextInput
              label="Password"
              secureTextEntry={true}
              name="password"
              handleChange={handleChange}
              values={values}
              handleBlur={handleBlur}
              errors={errors}
            />

            {auth.error != "" && (
              <Text style={{ fontSize: 10, color: "red", marginBottom: 5 }}>
                {auth.error}
              </Text>
            )}
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginVertical: 20,
                marginTop: 10,
              }}
              //onPress={() => navigation.navigate(ROUTE.RESET_PASSWORD)}
            >
              {/* <Text>Forget Password?</Text> */}
            </TouchableOpacity>

            <Button
              mode="contained"
              color={isValid ? DARK_YELLOW : LIGHT_YELLOW}
              onPress={handleSubmit}
              loading={auth.loading}
            >
              {auth.loading ? "Loading..." : "  LOGIN "}
            </Button>
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;

const styles = StyleSheet.create({});

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { WHITE } from "../../utils/colors";
const CustomTextInput = ({
  label,
  name,
  style,
  secureTextEntry,
  handleBlur = () => console.log("Emplty Blur Func"),
  values,
  handleChange,
  errors,
  keyboardType,
  styles ={},
  defaultValueForm,
  disabledInput = false
}) => {
  const [visibility, setVisibility] = useState(true);
  let theme = {
    outlineColor: "#acb1b9",
    activeOutlineColor: "#acb1b9",
  };

  const element = (
    <TextInput.Icon
      name="lock-outline"
      onPress={() => setVisibility(!visibility)}
    />
  );
   
  // console.log(handleChange(name))

  return (
    <View style={[{ marginVertical: 15 },styles]}>
      <TextInput
        label={label}
        mode="outlined"
        {...theme}
        style={[stylesCss.formStyle, styles ]}
        right={secureTextEntry ? element : null}
        secureTextEntry={secureTextEntry && visibility}
        onChangeText={handleChange(name)}
        value={values.name}
        defaultValue={defaultValueForm}
        onBlur={handleBlur(name)}
        keyboardType={keyboardType}
        disabled={disabledInput}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <Text style={{ fontSize: 10, color: "red" }}>{msg}</Text>
        )}
      />
    </View>
  );
};

export default CustomTextInput;

const stylesCss = StyleSheet.create({
  formStyle: { backgroundColor: WHITE },
});

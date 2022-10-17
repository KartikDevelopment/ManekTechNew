import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Styles } from "./screen.styles";

const Screen = ({ children, style }) => (
  <SafeAreaView style={[Styles.screen, style]}>{children}</SafeAreaView>
);

export { Screen };
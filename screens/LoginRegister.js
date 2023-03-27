// LoginRegister.tsx
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import styles from "../styles";

const LoginRegister = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/logos/tan.png")}
      />
      <Text style={styles.title}>SkillBridge</Text>
      <Text style={styles.subtitle}>
        “Knowledge is power”
      </Text>
      <Text style={styles.subtitle}>- Francis Bacon</Text>

      <Pressable
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
};

export default LoginRegister;

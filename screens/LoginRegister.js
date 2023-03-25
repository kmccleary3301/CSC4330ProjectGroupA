import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles  from '../styles';

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
        
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.registerButton]}
        
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
};
 
export default LoginRegister;
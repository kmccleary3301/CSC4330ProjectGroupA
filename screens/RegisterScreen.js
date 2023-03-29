import * as React from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from '../styles';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create an account to access all features</Text>

      <Pressable
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.buttonText}>Already have an account? Login here</Text>
      </Pressable>
    </View>
  );
};
 
export default RegisterScreen;

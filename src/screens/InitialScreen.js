import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import styles from '../../styles.js';

const InitialScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={{ width: 300, height: 200 }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
            source={require('../assets/logos/tan.png')}
          />
        </View>
      </View>
      <Text style={styles.title}>SkillBridge</Text>
      <Text style={styles.subtitle}>
        “Knowledge is power”
      </Text>
      <Text style={styles.boop}>- Francis Bacon</Text>

      <Pressable
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
};

export default InitialScreen;
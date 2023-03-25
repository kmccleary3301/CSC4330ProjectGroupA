import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import styles from '../styles';


const MySplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logos/blue.png')}
        style={styles.logo}
      />
    </View>
  );
};



export default MySplashScreen;

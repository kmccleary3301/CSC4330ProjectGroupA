import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import styles from '../styles';


const MySplashScreen = () => {
  const blue = '#182640';
  const tan = '#FAE8CD';

  return (
    <View style={[styles.container, { backgroundColor: tan }]}>
      <View style={styles.logoContainer}>
        <View style={{ width: 300, height: 200 }}>
          <Image
            style={{
              width: '50%',
              height: '50%',
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 100,

            }}
            source={require('../assets/logos/blue.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default MySplashScreen;
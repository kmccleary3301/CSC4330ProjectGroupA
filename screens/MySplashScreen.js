import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import styles from '../styles';

const MySplashScreen = () => {
  const blue = '#182640';
  const tan = '#FAE8CD';  
  const logoSize = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoSize, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: tan}]}>
       <View style={styles.logoContainer}>
        <Animated.View
          style={{
            width: logoSize.interpolate({
              inputRange: [0, 1],
              outputRange: ['50%', '100%'],
            }),
            height: logoSize.interpolate({
              inputRange: [0, 1],
              outputRange: ['50%', '100%'],
            }),
          }}
        >
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 100,
            }}
            source={require('../assets/logos/blue.png')}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default MySplashScreen;

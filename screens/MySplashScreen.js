import React from 'react';
import { StyleSheet, View, Image } from 'react-native';


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default MySplashScreen;

import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';



const AppHeader = ({ onHamburgerPress, navigation }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onHamburgerPress} style={[styles.menuButton, { flex: 1 }]}>
          <Image
            source={require('./assets/icons/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logos/blue.png')}
            style={styles.logo}
          />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  };
  
  
  
  
  
  

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    menuButton: {
      marginLeft: 10,
    },
    menuIcon: {
      width: 24,
      height: 24,
      marginLeft: 10,
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 180,
    },
    logo: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
    },
  });
  
  
  
  

export default AppHeader;

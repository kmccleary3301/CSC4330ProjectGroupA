import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AppHeader = ({ onHamburgerPress }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onHamburgerPress} style={styles.menuButton}>
          <Image
            source={require('./assets/icons/menu.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Image
          source={require('./assets/logos/blue.png')}
          style={styles.logo}
        />
        <View style={styles.spacer} />
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
    },
    logo: {
      position: 'absolute',
      width: 45,
      height: 45,
      resizeMode: 'contain',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      marginHorizontal: 'auto',
      marginVertical: 'auto',
    },
    spacer: {
      width: 45,
    },
  });
  
  

export default AppHeader;

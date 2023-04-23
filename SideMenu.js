import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SideMenu = ({ onClose, onLogout, onHelpCenter, onPrivacyPolicy, onSettings }) => {
  return (
    <View style={[styles.container, { paddingTop: 35 }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.innerContainer}>
        <View styles={styles.optionsContainer}>
          <TouchableOpacity onPress={onSettings} style={styles.button}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onHelpCenter} style={styles.button}>
            <Text style={styles.buttonText}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPrivacyPolicy} style={styles.button}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogout} style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#182640',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  innerContainer: { // Add this new style
    flex: 1,
    justifyContent: 'center',
    //marginTop: -150,
    paddingBottom: 100,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#FAE8CD',
    fontSize: 30,
    fontFamily: 'Vikendi',
  },
  button: {
    marginTop: 40,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAE8CD',
    fontSize: 36,
    fontFamily: 'Vikendi',
  },
  optionsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
});



export default SideMenu;

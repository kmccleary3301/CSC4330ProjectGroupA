import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, TextInput, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTogglePasswordVisibility } from './hooks/useTogglePasswordVisibility';




export default function App() {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');
  var [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder='Enter username'
          autoCapitalize='none'
          autoCorrect={false}
          textContentType='username'
          secureTextEntry={false}
          value={username}
          enablesReturnKeyAutomatically
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder='Enter password'
          autoCapitalize='none'
          autoCorrect={false}
          textContentType='newPassword'
          secureTextEntry={passwordVisibility}
          value={password}
          enablesReturnKeyAutomatically
          onChangeText={text => setPassword(text)}
        />
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons size={22} name={rightIcon} color='#232323' />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#d7d7d7',
    paddingVertical: 0
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: '90%'
  }
});

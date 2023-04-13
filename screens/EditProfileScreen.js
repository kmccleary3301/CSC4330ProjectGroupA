import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import NavBarContainer from '../NavBar';



const EditProfileScreen = () => {
    const navigation = useNavigation();

    const handleCancel = () => {
        navigation.navigate(ProfileScreen);
    }
    const handleSaveChanges = () => {
      navigation.navigate(ProfileScreen)
      //Obviously it needs to actually save the changes, here just navigates back to the profile screen
   };
 



    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.cancelContainor}>
            <Pressable
              onPress = {handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>

          <View style={horizontalLine}></View>



          <Pressable
            style={[styles.button, styles.saveChangesButton]}
            onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Save changes</Text>
          </Pressable>
        </View>
      <NavBarContainer />
    </View>
  );
  };
  
  
  
  const blue = '#182640';
  const tan = '#FAE8CD'; 

  const horizontalLine = {
    borderWidth: 1,
    borderColor: 'tan',
    marginVertical: 10,
  };
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#182640',
          paddingTop: 120,
        },
      cancelText: {
          fontFamily: 'SF',
          fontSize: 15,
          color: tan,
          backgroundColor: blue,
          padding: 5,
      },
      cancelContainor: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 16,
        zIndex: 999,
        flexDirection: 'row',
        alignItems: 'center',
      },
      button: {
        width: 175,
        height: 50,
        marginTop: 440, //subject to change as page evolves
        marginBottom: 10,
        borderRadius: 30,
        borderColor: tan,
        borderWidth: 4.5,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: blue,
        },
      buttonText: {
        color: tan,
        fontSize: 20,
        fontFamily: 'SF',
        },
      saveChangesButton: {
        backgroundColor: blue,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        borderColor: tan,
        borderWidth: 4,
      },
  });
  
  
  export default EditProfileScreen;
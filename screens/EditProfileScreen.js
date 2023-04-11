import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import NavBarContainer from '../NavBar';



const EditProfileScreen = () => {
    const navigation = useNavigation();
  
//   // Access the passed user profile information from the route prop
//   const { userProfile } = route.params;


//   const [name, setName] = useState(userProfile.name);
//   const [email, setEmail] = useState(userProfile.email);



//   const handleSaveProfile = () => {
//     const updatedUserProfile = {
//         ...userProfile, 
//         name: name, 
//         email: email,    
//   };
//   console.log("User profile was updated");
// };

return (
    <View style={{ flex: 1 }}>
    <View style={styles.container}></View>
    <NavBarContainer />
  </View>
);
};







  // Render the EditProfileScreen UI with the passed user profile information
//   return (
//     <View>
//       <Text>Edit Profile</Text>
//       <TextInput
//         value={name}
//         onChangeText={setName}
//         placeholder="Name"
//       />
//       <TextInput
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Email"
//       />
//       {/* Render other editable form fields */}
//       <Button title="Save" onPress={handleSaveProfile} />
//     </View>
//   );
// };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#182640',
        paddingTop: 120,
      },
});


export default EditProfileScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Picker
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles.js';
import { auth, db } from '../../firebase';
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useAuthValue } from '../../AuthContext'
import { subjectList } from '../utils/subjectList.js';
import { color } from 'react-native-reanimated';

const RegisterInfoScreen = ({ navigation }) => {

  const { currentUser } = useAuthValue();  
  const user = currentUser;  
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSubjectSelection = (value) => {
    if (selectedSubjects.includes(value)) {
      setSelectedSubjects((prev) => prev.filter((subject) => subject !== value));
    } else {
      setSelectedSubjects((prev) => [...prev, value]);
    }
  };

  const tan = '#FAE8CD';


  const handleSubmit = async (e) => {
    e.preventDefault();
    const type = user?.displayName;
    try {
      // update tutor profile info
      await updateDoc(doc(db, type, user?.uid), {
        
        selectedSubjects
      });
  
      // navigate to next screen
      navigation.navigate('HomeScreen');
    } catch (err) {
      console.error(err);
      alert('Error saving changes.');
    }
  };  

  const renderPicker = () => {
    return (
      <Picker
        style={[styles.picker, { paddingLeft: 5 }]}
        selectedValue={''}
        onValueChange={(value) => handleSubjectSelection(value)}
        mode="dropdown"
      >
        <Picker.Item label="Select a subject" value="" />
        {subjectList.map((subject) => (
          <Picker.Item
            key={subject.value || subject}
            label={subject.value || subject}
            value={subject.value || subject}
          />
        ))}
      </Picker>
    );
  };

  return (
    <View style={[styles.container, { justifyContent: 'start', paddingTop: 120, marginTop: 0 }]}>
      <View style={[styles.logoContainer, { marginTop: 0, paddingTop: 0 }]}>
        <View style={{ width: 200, height: 100, marginTop: 5 }}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
            source={require('../assets/logos/tan.png')}
          />
        </View>
      </View>
      <Text style={[styles.title, { textAlign: 'center', marginBottom: 0, paddingBottom: 0 }]}>Register</Text>
      <View style={styles.registerBody}>
        
          <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 16 }]}>
          Lastly, you'll just need to add your subjects of {''}
          {user?.displayName === 'student' || user?.displayName === 'tutor'
          ? 'interest'
          : 'expertise'}.
          </Text>
        {selectedSubjects.map((subject) => (
        <Text style={[    
          {color: tan},
          {fontFamily: 'SF'},
          {fontSize: 20},
          {alignSelf: 'flex-start'}, 
          {textAlign: 'center'}]}
         key={subject}>{subject}</Text>
      ))}
      {selectedSubjects.length < 5 && renderPicker()}

          <TouchableOpacity onPress={handleSubmit}
            style={[styles.button, styles.loginButton, { width: '50%' }]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        <View style={[styles.linkContainer, { marginTop: 16 }]}>          
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>            
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


RegisterInfoScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('InitialScreen')}>
      <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Image
          source={require('../assets/icons/back.png')}
          style={{ width: 30, height: 30 }}
        />
      </View>
    </TouchableOpacity>
  ),
});

export default RegisterInfoScreen;

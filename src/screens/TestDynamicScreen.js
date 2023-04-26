import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles';
import { Ionicons } from '@expo/vector-icons';
import NavBarContainer from '../../NavBar';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const blue = '#182640';
const tan = '#FAE8CD';
const lightBlue = '#C9D3FF';

const TestDynamicScreen = () => {
    // make sure to set the default value in the useState call (I already fixed it)

    const [data, setData] = useState([
      {
        id:   1,
        name: 'john',
        gender: 'm'
      },
      {
        id:   2,
        name: 'mary',
        gender: 'f'
      }
    ]);
    
    const updateFieldChanged = index => e => {
      console.log('index: ' + index);
      console.log('property name: '+ e.target.name);
      let newArr = [...data]; // copying the old datas array
      // a deep copy is not needed as we are overriding the whole object below, and not setting a property of it. this does not mutate the state.
      newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
    
      setData(newArr);
    }
    
    return (
      <React.Fragment>
        {data.map((datum, index) => {
          <li key={datum.name}>
            <input type="text" name="name" value={datum.name} onChange={updateFieldChanged(index)}  />
          </li>
        })}
      </React.Fragment>
    )
};


export default TestDynamicScreen;

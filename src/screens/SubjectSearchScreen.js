import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Date,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// type SubjectSearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SubjectSearchScreen'>;

// type Props = {
//   navigation: SubjectSearchScreenNavigationProp;
// };

const SubjectSearchScreen = ({ }) => {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');

  const handleSearch = () => {
    // Implement your search functionality here
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearch}
          value={search}
          placeholder="Search by tutor or subject"
          placeholderTextColor="#D2B48C"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dropDownContainer}>
        <Picker
          items={[
            { label: 'Math', value: 'math' },
            { label: 'Science', value: 'science' },
            { label: 'English', value: 'english' },
          ]}
          defaultValue={subject}
          containerStyle={styles.dropDown}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item) => setSubject(item.value)}
        />
      </View>
      <View style={styles.resultContainer}>
        {/* Render your search results here */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fae8cd',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#D2B48C',
    borderWidth: 1,
    borderRadius: 5,
    color: '#D2B48C',
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 5,
  },
  searchButton: {
    backgroundColor: '#D2B48C',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fae8cd',
  },
  dropDownContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#fafafa',
  },
  dropDown: {
    height: 40,
    width: '100%',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default SubjectSearchScreen;

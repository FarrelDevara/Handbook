import { gql } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function SearchScreen({ navigation }) {

  const SEARCH = gql`
  query SearchByUsername($username: String) {
  searchByUsername(username: $username) {
    _id
    name
    username
    email
    password
    FollowerData {
      _id
      name
      username
      email
    }
    FollowingData {
      _id
      name
      username
      email
    }
  }
}
  `

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Search Page</Text>
      <TextInput>

      </TextInput>
    </View>
  );
}

export default SearchScreen;

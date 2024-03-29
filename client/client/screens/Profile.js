import { gql } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const GET_USER = gql`
    query GetPost($id: ID) {
      getDetail(_id: $id) {
        _id
        name
        username
        email
        password
        FollowingData {
          _id
          name
          username
          email
        }
        FollowerData {
          _id
          name
          username
          email
        }
      }
    }
  `;

function ProfileScreen({ navigation }) {

const {loading,error,data} = useQuery(GET_USER)
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>PROFILE Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    borderStyle: 'dotted',
  },
  TextInput: {
    height: 50,
    flex: 1,
    textAlign: 'left',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '75%',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#0000ff',
  },
  loginText: {
    color: 'white',
  },
  registerBtn: {
    width: '75%',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#white',
  },
  registerText: {
    color: '#000',
  },
});

export default ProfileScreen;

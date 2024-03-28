import { gql, useMutation } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Register = gql`
mutation Mutation($name: String, $username: String, $email: String, $password: String) {
  Register(name: $name, username: $username, email: $email, password: $password) {
    _id
    name
    username
    email
    password
  }
}
`

function RegisterScreen({ navigation }) {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [RegisterFunction, {loading, error, data}] = useMutation(Register)

    async function handleRegister(){
        // console.log(name,username);
       try {
        await RegisterFunction({
            variables : {
                name,username,email,password
            }
        })
        console.log('berhasil');
       } catch (error) {
        Alert.alert(error.message)
        console.log(error);
       }
    }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Register Page</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Full Name"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={()=> handleRegister()}>
        <Text style={styles.loginText}  >Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerBtn}>
        {/* <Text>Already have an account?</Text> */}
        <Text className="bg-red" onPress={() => navigation.navigate("Login")}>Already have an account? Log in</Text>
      </TouchableOpacity>
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
        textAlign: 'left'
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
  loginText:{
    color:"white"
  },
  registerBtn: {
    width: '75%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#white',

  },
  registerText:{
    color:"#000"
  }
});

export default RegisterScreen;

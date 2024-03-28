import { gql } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import authContext from '../context/auth';
import * as SecureStore from `expo-secure-store`

const LOGIN = gql`
mutation Mutation($email: String, $password: String) {
  Login(email: $email, password: $password) {
    access_token
  }
}
`

function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setIsSignedIn } = useContext(authContext)

  const [LoginFunction, {loading, error, data}] = useMutation(LOGIN,{
    onCompleted : async (data) => {
      await SecureStore.setItemAsync("access_token", data?.login.access_token)
      setIsSignedIn(true)
    }
  })

  function handleLogin(){
    LoginFunction({
      variables :{
        email,password
      }
    })
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Login Page</Text>
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
      <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerBtn}>
        <Text style={styles.registerText} onPress={() => navigation.navigate("Register")}>Register</Text>
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
    borderRadius: 25,
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

export default LoginScreen;

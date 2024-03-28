import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/Login"
import RegisterScreen from "../screens/Register"
import HomeScreen from "../screens/Home"
import TabNavigator from "./TabNavigator"
import { useState } from "react"
import { Text } from "react-native"
import * as SecureStore from `expo-secure-store`

const Stack = createNativeStackNavigator()

function StackNavigator(){
    const [isSignedIn, setIsSignedIn] = useState(false)
    (async ()=>{
        const access_token = await SecureStore.getItemAsync("access_token")
        if(access_token){
            setIsSignedIn = true
        }
    })

    return(
        <Stack.Navigator initialRouteName="TabNavigator">
            
            {!isSignedIn ? (
                <>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                </>
            ) : (
                <Stack.Screen name="TabNavigator" options={{title: null, headerRight:()=>{
                    return <Text>Logout</Text>
                }}}component={TabNavigator}/>
            )
            }
        </Stack.Navigator>
    )
}

export default StackNavigator
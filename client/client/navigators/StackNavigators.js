import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/Login"
import RegisterScreen from "../screens/Register"
import HomeScreen from "../screens/Home"
import TabNavigator from "./TabNavigator"
import { useState, useEffect } from "react"
import { Text } from "react-native"
import * as SecureStore from "expo-secure-store"

const Stack = createNativeStackNavigator()

function StackNavigator(){
    const [isSignedIn, setIsSignedIn] = useState(true)
    
    useEffect(() => {
        const checkAccessToken = async () => {
            const access_token = await SecureStore.getItemAsync("access_token")
            if(access_token){
                setIsSignedIn(true)
            }
        }
        checkAccessToken()
    }, []) // Empty dependency array ensures the effect runs only once, similar to componentDidMount

    // (async() =>{
    //     const checkAccessToken = async () => {
    //         const access_token = await SecureStore.getItemAsync("access_token")
    //         if(access_token){
    //             setIsSignedIn(true)
    //         }
    //     }
    //     checkAccessToken()
    // })();

    return(
        <Stack.Navigator initialRouteName="TabNavigator" value={{ isSignedIn, setIsSignedIn}}>
            
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

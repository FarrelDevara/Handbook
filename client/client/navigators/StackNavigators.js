import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/Login"
import RegisterScreen from "../screens/Register"
import HomeScreen from "../screens/Home"
import TabNavigator from "./TabNavigator"
import { useState } from "react"
const Stack = createNativeStackNavigator(

)

function StackNavigator(){
    const [isSignedIn, setIsSignedIn] = useState(false)

    return(
        <Stack.Navigator initialRouteName="TabNavigator">
            
            {!isSignedIn ? (
                <>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                </>
            ) : (
                <Stack.Screen name="TabNavigator" component={TabNavigator}/>
            )

            }
        </Stack.Navigator>
    )
}

export default StackNavigator
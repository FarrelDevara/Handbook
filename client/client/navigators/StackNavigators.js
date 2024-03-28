import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/Login"
import RegisterScreen from "../screens/Register"
import HomeScreen from "../screens/Home"
const Stack = createNativeStackNavigator()


function StackNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
    )
}

export default StackNavigator
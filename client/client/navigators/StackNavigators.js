import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/Login"
import RegisterScreen from "../screens/Register"
import HomeScreen from "../screens/Home"
import TabNavigator from "./TabNavigator"
import { useState, useEffect, useContext } from "react"
import { Text, TouchableOpacity } from "react-native"
import * as SecureStore from "expo-secure-store"
import AddPostScreen from "../screens/AddPost"
import PostDetail from "../screens/PostDetail"
import LogoutButton from "../components/LogoutButton"
import SearchScreen from "../screens/Search"
import AuthContext from "../context/auth"
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"
import DetailUserScreen from "../screens/DetailUser"

const Stack = createNativeStackNavigator()

function StackNavigator(){

    const navigation = useNavigation()
    const { isSignedIn, setIsSignedIn } = useContext(AuthContext)
    
    useEffect(() => {
        const checkAccessToken = async () => {
            const access_token = await SecureStore.getItemAsync("access_token")
            if(access_token){
                setIsSignedIn(true)
            }
        }
        checkAccessToken()
    }, [])

    return(
        <Stack.Navigator>
            
            {!isSignedIn ? (
                <>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                </>
            ) : (
                <>
                <Stack.Screen name="TabNavigator" options={{title: null, 
                headerLeft:()=>{return <Text className="text-blue-500 font-bold text-xl">Handbook</Text>}, 
                headerRight:()=>{
                    return (<>
                    <TouchableOpacity className="mr-3" onPress={()=>{ navigation.navigate("Search") }}>
                        <Feather name="search" size={24} color="black"/>
                    </TouchableOpacity>
                    <LogoutButton/>
                    </>)
                }
                }}component={TabNavigator}/>

                <Stack.Screen name="AddPost" component={AddPostScreen} options={{title: "Add New Post"}}/>
                <Stack.Screen name="PostDetail" component={PostDetail} options={{title: "Post Detail"}}/>
                <Stack.Screen name="Search" component={SearchScreen}/>
                <Stack.Screen name="DetailUser" component={DetailUserScreen} options={{title: "Searched User"}}/>
                </>
                
            )
            }
        </Stack.Navigator>
    )
}

export default StackNavigator

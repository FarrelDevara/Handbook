import { Text, TouchableOpacity } from "react-native"
import * as SecureStore from "expo-secure-store"
import { useContext } from "react"
import authContext from "../context/auth"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import client from '../config/apolloClient';

function LogoutButton(){
    const { setIsSignedIn } = useContext(authContext)
   
    return(
        <TouchableOpacity onPress={async () =>{
            await SecureStore.deleteItemAsync("access_token")
            client.clearStore();
            setIsSignedIn(false)
        }}>
           <MaterialCommunityIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default LogoutButton
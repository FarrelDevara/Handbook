import { Text, TouchableOpacity } from "react-native"
import * as SecureStore from "expo-secure-store"
import { useContext } from "react"
import authContext from "../context/auth"

function LogoutButton(){
    const { setIsSignedIn } = useContext(authContext)
   
    
    return(
        <TouchableOpacity onPress={async () =>{
            await SecureStore.deleteItemAsync("access_token")
            setIsSignedIn(false)
        }}>
            <Text>
                Logout
            </Text>
        </TouchableOpacity>
    )
}

export default LogoutButton
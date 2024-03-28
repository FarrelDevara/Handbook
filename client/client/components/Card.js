import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function Card({data}) {
    // console.log(data,"<<<<<<<<<<<<< di card");
    
  return (
    // <View className="justify-center flex-1 items-center">
    //   <StatusBar style="auto" />
    //   <Text className='bg-red-500'>Card</Text>
      
    // </View>
    <View className='bg-white shadow-md'>
      <Text style={styles.title}>{data.content}</Text>
      {/* <Text style={styles.content}>asdasd</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    content: {
      fontSize: 16,
    },
  });
export default Card;

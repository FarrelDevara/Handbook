import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function Card({ navigation }) {
  return (
    <View>
      <StatusBar style="auto" />
      <Text className='bg-red-500'>HOME Page</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Card;

import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../components/Card';

function HomeScreen({ navigation }) {
  return (
    <View className="justify-center flex-1 items-center">
      <StatusBar style="auto" />
      <Text className="bg-red-500">HOME Page</Text>
      <Card/>
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

export default HomeScreen;

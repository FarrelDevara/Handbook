import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import { useQuery, gql } from '@apollo/client';

const GET_POST = gql`
  query Query {
    getPost {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      UserData {
        _id
        name
        username
        email
      }
    }
  }
`;

function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POST);
  // console.log(data, 'data di home <<<<<<<<<<<<<<<<<<');
  console.log(error);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="bg-white justify-center flex-1">
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() =>{navigation.navigate("AddPost")}}>
          <Text className=" rounded-lg p-4 shadow-md" >Add New Post</Text>
        </TouchableOpacity>
      </View>

      <View className=" flex-1">
   
        {data?.getPost.map((item, index) => (
          <Card
            data={item}
            key={index}
            navigation={navigation}
          />
        ))}
    
        <StatusBar style="auto" />
        {/* <Text className="bg-red-500">HOME Page</Text> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

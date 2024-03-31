import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import { useQuery, gql } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';
export const GET_POST = gql`
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
  // console.log(error);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 bg-white mb-2 items-center">
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() =>{navigation.navigate("AddPost")}}>
          <View className="flex-row p-4 ">
          <Text><MaterialIcons name="post-add" size={24} color="black" /></Text>
          <Text className=" text-black font-bold mt-1 ml-1" >Add New Post</Text>

          </View>
        </TouchableOpacity>
      </View>
        {data?.getPost.map((item, index) => (
          <Card
            data={item}
            key={index}
            navigation={navigation}
          />
        ))}
        {/* <Text className="bg-red-500">HOME Page</Text> */}
    </ScrollView>
  );
}


export default HomeScreen;

import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../components/Card';
import { useQuery, gql } from '@apollo/client';

const GET_POST = gql`
query Query($id: ID) {
  getPostById(_id: $id) {
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
`

function PostDetail({ navigation }) {
  const {loading,error,data} = useQuery(GET_POST)
  // console.log(data, "<<<<<<<<<<<<<<<<<<");
  
  return (
    <View className="justify-center flex-1 items-center">
      <StatusBar style="auto" />
      {/* <Text className="bg-red-500">HOME Page</Text> */}
      {data?.getPost.map((item)=>(
        <Card data={item}/>
      ))
      }
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

export default PostDetail;

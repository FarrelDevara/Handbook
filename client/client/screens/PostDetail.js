import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Card from '../components/Card';
import { useQuery, gql, useMutation } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

ADD_LIKES = gql`
  mutation AddLikes($postId: ID) {
    addLikes(postId: $postId) {
      username
      createdAt
      updatedAt
    }
  }
`;

GET_DETAIL = gql`
query GetPostById($_id: ID) {
  getPostById(_id: $_id) {
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

}`;

ADD_COMMENT = gql`
mutation Mutation($content: String, $postId: ID) {
  addComment(content: $content, postId: $postId) {
    content
    username
    createdAt
    updatedAt
  }
}
`

function PostDetail({ navigation, route }) {
  const { _id } = route.params;
  const [content, setContent] = useState('');

  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      _id
    },
  });

  // LIKE
  const [AddLike] = useMutation(ADD_LIKES,{
    refetchQueries: [GET_DETAIL],
    onError: (error) =>{
      Alert.alert('Error', error.message)
    },
    onCompleted: () => {
      Alert.alert('Success', 'Liked this post');
    }
  })

  function handleInputLike() {
    AddLike({
      variables: {
        postId: _id,
      },
    });
  }

  // COMMENT

  const [AddComment] = useMutation(ADD_COMMENT,{
    refetchQueries: [GET_DETAIL]
  })

  async function handleInputComment() {
    try {
      if (!content) {
        Alert.alert("Isi Comment terlebih dahulu")
      }else{
        AddComment({
          variables: {
            content,
            postId : _id
          },
        });
      }
    } catch (error) {
      
    }
  }

  
  return (
    <>
    <ScrollView>
      <View className="p-4 w-full h-full">
        <View className="bg-white rounded-lg p-4 shadow-md mb-4">
          <View className="flex-row items-center mb-2">
            <Image
              source={{ uri: 'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg' }}
              className="w-8 h-8 rounded-full mr-3"
            />
            <View>
              <Text>{data?.getPostById.UserData.username}</Text>
            </View>
          </View>
          <Text className="text-xl mb-2">{data?.getPostById.content}</Text>
          <Image
            source={{ uri: data?.getPostById.imgUrl }}
            className="w-full h-40 rounded-md mb-4"
          />
          <Text className="text-gray-500 mb-2">{data?.getPostById.tags.join(', ')}</Text>
          <View className="flex-row">
            <Text className="">
              <TouchableOpacity onPress={() => handleInputLike()}>
                <AntDesign
                  name="like2"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </Text>

              <Text className="mt-1 ml-1 text-blue-500">{data?.getPostById.likes.length}</Text>
            
            <Text className=" ml-4 ">
              <FontAwesome
                name="comment-o"
                size={24}
                color="black"
              />{' '}
            </Text>
            <Text className="ml-1 mt-1 text-blue-500">{data?.getPostById.comments.length}</Text>
          </View>
          <View className="border-b-2 border-gray-300 mb-3 mt-3"/>
        {/* add comments */}
        <View className="flex-row mb-5">
          <TextInput
        className="border border-gray-400 rounded-lg p-1 w-4/6 mr-2 "
        placeholder="Comment"
        onChangeText={(text) => setContent(text)}
      />
      <TouchableOpacity
        title="Comment"
        className="bg-blue-500 rounded-lg p-2 px-2"
        onPress={handleInputComment}
      >
        <Text className="text-white text-sm font-semibold">Comment</Text>
      </TouchableOpacity>
        </View>
        {/* comments */}
        <View className="">
            {data?.getPostById.comments.map((item, index) => (
          <View className="flex-row items-center mb-2">
              <>
                <Image
                  source={{ uri: 'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg' }}
                  className="w-8 h-8 rounded-full mr-3"
                  key={1}
                />
                <View className="border-gray-400 border rounded-lg p-1">
                <Text key={2} className="font-bold text-l mb-1 "> {item.username} </Text>
                <Text key={3} className="mb-1"> {item.content}</Text>
                </View>
              </>
          </View>
            ))}
        </View>
      </View>
      </View>
      </ScrollView>
    </>
  );
}


export default PostDetail;

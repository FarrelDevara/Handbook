import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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

function PostDetail({ navigation, route }) {
  const { _id } = route.params;

  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      _id
    },
  });

  const [AddLike] = useMutation(ADD_LIKES,{
    refetchQueries: [GET_DETAIL]
  })

  function handleInput() {
    AddLike({
      variables: {
        postId: _id,
      },
    });
  }

  return (
    <>
      <View className="p-4">
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
            <Text className="text-blue-500">
              <TouchableOpacity onPress={() => handleInput()}>
                <AntDesign
                  name="like2"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              {data?.getPostById.likes.length}
            </Text>
            <Text className="text-green-500 ml-4 ">
              <FontAwesome
                name="comment-o"
                size={24}
                color="black"
              />{' '}
              {data?.getPostById.comments.length}
            </Text>
          </View>
        </View>
        {/* comments */}
        <View>
          <View className="flex-row items-center mb-2">
            {data?.getPostById.comments.map((item, index) => (
              <>
                <Image
                  source={{ uri: 'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg' }}
                  className="w-8 h-8 rounded-full mr-3"
                  key={1}
                />
                <Text key={2}> {item.username} </Text>
                <Text key={3}> {item.content}</Text>
              </>
            ))}
          </View>
        </View>
      </View>
    </>
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

export default PostDetail;

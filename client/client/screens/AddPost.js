import { gql, useMutation } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, classNameSheet, Alert } from 'react-native';
import { GET_POST } from './Home';

const ADD_POST = gql`
  mutation AddPost($content: String, $imgUrl: String, $tags: [String]) {
    addPost(content: $content, imgUrl: $imgUrl, tags: $tags) {
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
    }
  }
`;

function AddPostScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [tags, setTags] = useState('');

  const [addPost, { loading, error, data }] = useMutation(ADD_POST, {
    refetchQueries: [ GET_POST ]
  });

  const handleSubmit = async () => {
    try {
      //loading
      await addPost({ variables: { content, imgUrl, tags: tags.split(',') } });
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar className="auto" />
      <Text className="text-xl font-bold mb-4">Add Post Page</Text>
      <TextInput
        className="border border-gray-400  rounded-lg p-2 w-4/5 mb-4"
        placeholder="Content"
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <TextInput
        className="border border-gray-400 rounded-lg p-2 w-4/5 mb-4"
        placeholder="Image URL"
        value={imgUrl}
        onChangeText={(text) => setImgUrl(text)}
      />
      <TextInput
        className="border border-gray-400 rounded-lg p-2 w-4/5 mb-4"
        placeholder="Tags"
        value={tags}
        onChangeText={(text) => setTags(text)}
      />
      <Button
        title="Add Post"
        onPress={handleSubmit}
        disabled={!content || !imgUrl || !tags}
      />
    </View>
  );
}

export default AddPostScreen;

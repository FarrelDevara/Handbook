import { gql } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function AddPostScreen({ navigation }) {

  const SEARCH = gql`
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
  `

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Add Post Page</Text>
      <TextInput>

      </TextInput>
    </View>
  );
}

export default AddPostScreen;

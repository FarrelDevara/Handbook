import { gql, useMutation, useQuery } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SEARCH_USER = gql`
  query SearchByUsername($username: String) {
    searchByUsername(username: $username) {
      _id
      name
      username
      email
      password
      FollowerData {
        _id
        name
        username
        email
      }
      FollowingData {
        _id
        name
        username
        email
      }
    }
  }
`;

const FOLLOW = gql`
mutation Follow($followingId: ID) {
  Follow(followingId: $followingId) {
    _id
    followingId
    followerId
    createdAt
    updatedAt
  }
}
`

function SearchScreen({navigation}) {

  // Search
  const [username, setUsername] = useState('');

  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: {
      username: username
    },
  });

  // Follow

  const [FollowFunction] = useMutation(FOLLOW,{
    onError: (error) =>{
      Alert.alert('Error', error.message)
    },
    onCompleted: () => {
      Alert.alert('Success', 'Followed Succesfully');
    }
  })

  function handleFollow(id) {
    // console.log(id);
    FollowFunction({
      variables: {
        followingId : id
      },
    });
  }

  return (
    <View className="flex-1">
      <StatusBar style="auto" />

      {/* add comments */}
      <View className="flex-row mb-5 mt-5">
        <TextInput
          className="border border-gray-400 rounded-lg p-1 w-5/6 ml-7"
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View className="border-b-2 border-gray-300 mb-3" />
      <View>
        {data?.searchByUsername?.map((item, index) => (
          <>
            <View className="flex-row items-center justify-center  ml-5" key={index}>
              <TouchableOpacity onPress={()=>{navigation.navigate("DetailUser",item._id)}}>
              <Image
                source={{ uri: 'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg' }}
                className="w-12 h-12 rounded-full mb-4"
              />
              </TouchableOpacity>
              <View className="ml-4 flex-1 mb-5">
                <Text className="text-lg font-semibold">{item.name}</Text>
              </View>
              
              <TouchableOpacity
                title="Username"
                className="bg-blue-500 rounded-lg p-2 px-4 ml-5 mr-5 mb-5"
                onPress={() => handleFollow(item._id)}
              >
                <Text className="text-white text-sm font-semibold">Follow</Text>
              </TouchableOpacity>
            </View>
          </>
        ))}
      </View>
    </View>
  );
}

export default SearchScreen;

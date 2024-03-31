import { gql, useQuery } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, classNameSheet, ScrollView, Alert } from 'react-native';

const GET_USER = gql`
    query GetDetail($id: ID) {
    getDetail(_id: $id) {
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

function ProfileScreen() {

  // const { _id } = route.params
  // console.log(route.params,"<<< route");

  const {loading,error,data} = useQuery(GET_USER)

  console.log(data);
  return (
    <ScrollView>
    <View className="flex-1 bg-white h-screen">
      <StatusBar style="auto" />
      <View className="bg-white p-6 rounded-lg  mb-4 w-full h-full">
      <Image
          source={{ uri: 'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg' }}
          className="w-40 h-40 rounded-full mb-4"
        />
      <View className="flex-row items-center">
      <Text className="text-xl font-bold mb-2">{data?.getDetail.name}</Text>
      <Text className="text-gray-600 mb-2">({data?.getDetail.username})</Text>
      </View>
      
      <Text className="text-gray-600 mb-4">{data?.getDetail.email}</Text>

      <View className="border-b-2 border-gray-300 mb-3"/>

      <View className="flex-row justify-between mb-5 ml-4">
      {/* Followers */}
      <View className="">
      <Text>Follower: {data?.getDetail?.FollowerData?.length}</Text>
        {data?.getDetail?.FollowerData?.map((follower, index) => (
          <View key={index} className="flex-row mt-2 items-center">
            <Image
              source={{ uri: 'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg' }}
              className="w-10 h-10 rounded-full mr-2"
            />
            <Text className="mb-2">{follower.username}</Text>
          </View>
        ))}
      </View>
      {/* Following */}
      <View className="mr-4">
      <Text>Following: {data?.getDetail?.FollowingData?.length}</Text>
        {data?.getDetail?.FollowingData?.map((following, index) => (
          <View key={index} className="flex-row mt-2 items-center">
            <Image
              source={{ uri: 'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg' }}
              className="w-10 h-10 rounded-full mr-2"
            />
            <Text className="mb-2">{following.username}</Text>
          </View>
        ))}
      </View>
      </View>
    </View>
    </View>
    </ScrollView>
  );
}


export default ProfileScreen;

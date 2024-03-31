import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

function Card({ data, navigation }) {
  // console.log(data, '<<<<<<<<<<<<< di card');

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          // console.log(data._id);
          navigation.navigate('PostDetail', data);
        }}
      >
        <View className="mb-2 mt-2">
          <View className="bg-white rounded-lg p-4 shadow-md ">
            <View className="flex-row items-center mb-2">
              <Image
                source={{ uri: 'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg' }}
                className="w-8 h-8 rounded-full mr-3"
              />
              <View>
                <Text>{data.UserData.username}</Text>
              </View>
            </View>
            <Text className="text-xl mb-2">{data.content}</Text>
            <Image
              source={{ uri: data.imgUrl }}
              className="w-full h-40 rounded-md mb-4"
            />
            <Text className="text-gray-500 mb-2">{data.tags.join(', ')}</Text>
            <View className="flex-row items-center">
              <Text className="">
                <AntDesign
                  name="like2"
                  size={24}
                  color="black"
                />
                
              </Text>
              <Text className="ml-1 text-blue-500">{data.likes.length}</Text>
              <Text className=" ml-3">
                <FontAwesome
                  name="comment-o"
                  size={24}
                  color="black"
                />{' '}
                
              </Text>
              <Text className="ml-1 text-blue-500">{data.comments.length}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default Card;

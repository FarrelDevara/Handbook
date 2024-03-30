import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

function Card({ data }) {
  console.log(data, "<<<<<<<<<<<<< di card");
    
  return (
      <View className="p-4">
        <View className="bg-white rounded-lg p-4 shadow-md">
          <Image source={{ uri: data.imgUrl }} className="w-full h-40 rounded-md mb-4" />
          <View className="mb-4">
            <Text className="text-xl font-bold mb-2">{data.content}</Text>
            <Text className="text-gray-500 mb-2">{data.tags.join(', ')}</Text>
            <View className="flex-row justify-between">
              <Text className="text-blue-500">Likes: {data.likes.length}</Text>
              <Text className="text-green-500">Comments: {data.comments.length}</Text>
            </View>
          </View>
        </View>
      </View>
  );
}

export default Card;

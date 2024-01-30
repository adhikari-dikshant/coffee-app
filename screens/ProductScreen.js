import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftCircleIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { ShoppingBag } from 'react-native-feather';

const { width, height } = Dimensions.get('window');
const android = Platform.OS == 'android';

export default function FavouriteScreen(props) {
  const item = props.route.params;
  const [size, setSize] = useState('small');
  const [count, setCount] = useState(1); // Count of coffees
  const navigation = useNavigation();

  // Function to handle count change
  const handleCountChange = (newCount) => {
    if (newCount >= 1) {
      setCount(newCount);
    } else {
      // If count is less than 1, navigate back to home screen
      navigation.goBack();
    }
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Image
        source={require('../assets/images/beansBackground2.png')}
        style={{ height: 200, borderBottomLeftRadius: 55, borderBottomRightRadius: 55 }}
        className="w-full absolute"
      />
      <SafeAreaView className="space-y-4 flex-1">
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity className=" rounded-full " onPress={() => navigation.goBack()}>
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className=" rounded-full border-2 border-white p-2">
            <HeartIcon size="24" color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            shadowColor: themeColors.bgDark,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 30 },
            shadowOpacity: 0.9,
          }}
          className="flex-row justify-center">
          <Image source={item.image} className="h-40 w-40" />
        </View>
        <View
          style={{ backgroundColor: themeColors.bgLight }}
          className="flex-row justify-center items-center mx-4 rounded-3xl p-0.25 px-2 space-x-1 opacity-90 w-16">
          <StarIcon size="15" color="white" />
          <Text className="text-base font-semibold text-white">{item.stars}</Text>
        </View>
        <View className="px-4 flex-row justify-between items-center">
          <Text style={{ color: themeColors.text }} className="text-2xl font-bold">
            {item.name}
          </Text>
          <Text style={{ color: themeColors.text }} className="text-lg font-semibold">
            $ {item.price}
          </Text>
        </View>
        <View className="px-4 space-y-2">
          <Text style={{ color: themeColors.text }} className="text-lg font-bold">
            Coffee size
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => setSize('small')}
              style={{ backgroundColor: size == 'small' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
              className="p-3 px-7 rounded-xl">
              <Text className={size == 'small' ? 'text-white' : 'text-gray-700'}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('medium')}
              style={{ backgroundColor: size == 'medium' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
              className="p-3 px-7 rounded-xl">
              <Text className={size == 'medium' ? 'text-white' : 'text-gray-700'}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('large')}
              style={{ backgroundColor: size == 'large' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
              className="p-3 px-7 rounded-xl">
              <Text className={size == 'large' ? 'text-white' : 'text-gray-700'}>Large</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-4 space-y-2">
          <Text style={{ color: themeColors.text }} className="text-lg font-bold">
            About
          </Text>
          <Text className="text-gray-600">{item.desc}</Text>
        </View>
      </SafeAreaView>

      <View className={`space-y-3 ${android ? 'mb-3' : 'mb-2'}`}>
        <View className="flex-row justify-between items-center px-4 mb-2">
          <View className="flex-row items-center space-x-1">
            <Text className="text-base text-gray-700 font-semibold opacity-60">Volume</Text>
            <Text className="text-base text-black font-semibold"> {item.volume}</Text>
          </View>
          <View className="flex-row items-center space-x-4 border-gray-500 border rounded-xl p-1 px-4">
            <TouchableOpacity onPress={() => handleCountChange(count - 1)}>
              <MinusIcon size="20" strokeWidth={3} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={{ color: themeColors.text }} className="font-extrabold text-lg">
              {count}
            </Text>
            <TouchableOpacity onPress={() => handleCountChange(count + 1)}>
              <PlusIcon size="20" strokeWidth={3} color={themeColors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between px-4">
          <TouchableOpacity className="p-4 rounded-xl border border-gray-400">
            <ShoppingBag size="30" color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgLight }}
            className="p-4 rounded-xl flex-1 ml-4">
            <Text className="text-center text-white text-base font-semibold">Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

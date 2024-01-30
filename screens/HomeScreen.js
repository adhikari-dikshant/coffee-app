import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { categories, coffeeItems } from '../constants';
import Carousel from 'react-native-snap-carousel';
import CoffeeCard from '../components/coffeeCard';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'

const { width, height } = Dimensions.get('window');
const android = Platform.OS == 'android';
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />
      <Image
        source={require('../assets/images/beansBackground1.png')}
        style={{ height: height * 0.2 }}
        className="w-full absolute -top-2 opacity-10" />
      <SafeAreaView className={android ? '-mb-1' : ''}>
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center">
          <Image
            source={require('../assets/images/avatar.png')}
            className="h-7 w-7 rounded-lg"
          />
          <View className="flex-row items-center space-x-2">
            <MapPinIcon size="20" color={themeColors.bgLight} />
            <Text className="font-semibold text-base">
              Delhi, India
            </Text>
          </View>
          <BellIcon size="23" color="black" />
        </View>
        {/* search bar */}
        <View className="mx-5 shadow" style={{ marginTop: height * 0.05 }}>
          <View className="flex-row items-center rounded-2xl p-0.5 bg-[#e6e6e6]">
            <TextInput placeholder='Search' className="p-2 flex-1 font-semibold text-gray-700" />
            <TouchableOpacity
              className="rounded-xl p-2.5"
              style={{ backgroundColor: themeColors.bgLight }}>
              <MagnifyingGlassIcon size="20" strokeWidth={1.5} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {/* categories */}
        <View className="px-5 mt-6">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={item => item.id}
            className="overflow-visible"
            renderItem={({ item }) => {
              isActive = item.id == activeCategory;
              let activeTextClass = isActive ? 'text-white' : 'text-gray-700';
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(item.id)}
                  style={{ backgroundColor: isActive ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
                  className="p-3 px-5 mr-2 rounded-2xl shadow">
                  <Text className={"font-semibold " + activeTextClass}>{item.title}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </SafeAreaView>

      {/* coffee cards */}
      <ScrollView contentContainerStyle={{ flexGrow: 0.5 }}>
        <View
          style={{
            overflow: 'visible',
            flex: 1,
            justifyContent: 'center',
            marginTop: android ? 4 : 0
          }}>
          <View>
            <Carousel
              containerCustomStyle={{ overflow: 'visible' }}
              data={coffeeItems}
              renderItem={({ item }) => <CoffeeCard item={item} />}
              firstItem={1}
              loop
              inactiveSlideScale={0.75}
              inactiveSlideOpacity={0.75}
              sliderWidth={width}
              itemWidth={width * 0.63}
              slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

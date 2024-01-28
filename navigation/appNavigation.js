import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { Dimensions, LogBox, Platform, Text, View } from 'react-native';
import ProductScreen from '../screens/ProductScreen';
import { themeColors } from '../theme';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid } from 'react-native-heroicons/solid';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const android = Platform.OS == 'android';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AppNavigation() {
  return (
    <NavigationContainer className="fixed">
      <Stack.Navigator screenOptions={{
        contentStyle: { backgroundColor: 'white' }
      }}>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name="Product" options={{ headerShown: false }} component={ProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon: ({ focused }) => menuIcons(route, focused),
      tabBarStyle: {
        position: 'fixed',
        marginBottom: 10,
        height: 60,
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 20,
        backgroundColor: themeColors.bgLight,

      },
      tabBarItemStyle: {
        marginTop: android ? 0 : 0,

      }
    })}

    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="favourite" component={HomeScreen} />
      <Tab.Screen name="cart" component={HomeScreen} />
    </Tab.Navigator>
  )
}

const menuIcons = (route, focused) => {
  let icon;
  if (route.name === 'home') {
    icon = focused ? <HomeSolid size="20" color={themeColors.bgLight} /> : <HomeOutline size="24" strokeWidth={1} color="white" />
  } else if (route.name === 'favourite') {
    icon = focused ? <HeartSolid size="20" color={themeColors.bgLight} /> : <HeartOutline size="24" strokeWidth={1} color="white" />
  } else if (route.name === 'cart') {
    icon = focused ? <BagSolid size="20" color={themeColors.bgLight} /> : <BagOutline size="24" strokeWidth={1} color="white" />
  }


  let buttonClass = focused ? "bg-white" : "";
  return (
    <View className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
      {icon}
    </View>
  )
}
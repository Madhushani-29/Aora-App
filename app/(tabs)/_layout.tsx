import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { colors, icons, strings } from '@/constants'

type TabIconProperties = {
  icon: ImageSourcePropType,
  color: string,
  name: string,
  focused: boolean
}

const TabIcon = ({ icon, color, name, focused }: TabIconProperties) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text
        className={`${focused ? 'font-semibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}


const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          //hide default tab title
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.tabBarIconActivateColor,
          tabBarInactiveTintColor: colors.tabBarIconInactivateColor,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.tabBarBorderColor,
            borderTopWidth: 1,
            height: 70,
          }
        }}>
        <Tabs.Screen
          name='home'
          options={{
            title: strings.homeTabTitle,
            //hide the header below the main header
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name='Home' icon={icons.home} />
            )
          }}
        />
        <Tabs.Screen
          name='bookmark'
          options={{
            title: strings.bookmarkTabTitle,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name='Bookmark' icon={icons.bookmark} />
            )
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: strings.createTabTitle,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name='Create' icon={icons.plus} />
            )
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: strings.profileTabTitle,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} focused={focused} name='Profile' icon={icons.profile} />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabLayout
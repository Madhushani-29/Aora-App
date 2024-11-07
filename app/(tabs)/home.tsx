import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType } from '@/types/Types';
import { colors } from '@/constants';

const Home = () => {
  const { isLoggedIn, user, isLoading } = useGlobalContext() as GlobalContextType;

  if (isLoading) {
    return (
      <View className='items-center justify-center h-full w-full bg-primary'>
        <ActivityIndicator size="large" color={colors.loadingIndicatorDarkColor} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-primary p-4 h-full'>
        <View>
          <Text className='text-white'>Home</Text>
          <Text className='text-white'>{user?.username}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
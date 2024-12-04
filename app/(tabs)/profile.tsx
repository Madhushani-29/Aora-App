import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, icons, strings } from '@/constants'
import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'
import { useAppWrite } from '@/hooks/useAppwrite'
import { GlobalContextType, PostType } from '@/types/Types'
import { getPostsById, signOut } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'
import InforBox from '@/components/InforBox'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext() as GlobalContextType;
  const { data: posts, isLoading: isPostsLoading, refetch } = useAppWrite<PostType[]>(
    () => {
      // if not user then return an empty array
      if (!user?.$id) {
        return Promise.resolve([]);
      }
      // there send the doc id not the user registered acc no
      return getPostsById(user.$id);
    }
  );

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/(auth)/sign-in");
  }

  if (isPostsLoading) {
    return (
      <View className='items-center justify-center h-full w-full bg-primary'>
        <ActivityIndicator size={50} color={colors.loadingIndicatorDarkColor} />
      </View>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) =>
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            creator={item.creator}
            avatar={item.avatar}
            video={item.video}
          />}
        ListHeaderComponent={
          <View
            className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={logout}>
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6' />
            </TouchableOpacity>
            <View
              className='w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center' >
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover' />
            </View>
            <InforBox
              title={user?.username!}
              containerStyles='mt-5'
              titleStyles='text-lg' />
            <View
              className='mt-5 flex-row'>
              <InforBox
                title={posts.length.toString()}
                subtitle={strings.postsSubtitleText}
                containerStyles='mr-10'
                titleStyles='text-xl' />
              <InforBox
                title='1.5k'
                subtitle={strings.followersSubtitleText}
                titleStyles='text-xl' />
            </View>
          </View>
        }
        ListEmptyComponent={() => {
          return <EmptyState
            title={strings.emptyProfileViewSubtitleText}
            subtitle={strings.emptySearchViewSubtitleText} />
        }}
      />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})
import { View, Text, ActivityIndicator, FlatList, Image, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType, PostType } from '@/types/Types';
import { colors, images, strings } from '@/constants';
import SearchInputField from '@/components/SearchInputField';
import TrendingPosts from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import { useAppWrite } from '@/hooks/useAppwrite';
import VideoCard from '@/components/VideoCard';

const Home = () => {
  const { user, isLoading } = useGlobalContext() as GlobalContextType;
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, isLoading: isPostsLoading, refetch } = useAppWrite<PostType[]>(getAllPosts);
  const { data: latestPosts, isLoading: isLatestPostsLoading, refetch: refetchLatestPosts } = useAppWrite<PostType[]>(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  if (isLoading) {
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
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='text-gray-100 font-pmedium text-sm'>
                  {strings.welcomeText}
                </Text>
                <Text className='text-white font-psemibold text-2xl'>
                  {user?.username}
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInputField
              placeHolder={strings.searchbarPlaceholderText} />

            <View className='w-full flex-1 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular -mb-10'>
                {strings.latestVideoTitleText}
              </Text>
            </View>
            <TrendingPosts posts={latestPosts} />
          </View>
        }
        ListEmptyComponent={() => {
          return <EmptyState
            title={strings.emptyViewTitleText}
            subtitle={strings.emptyViewSubtitleText} />
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;

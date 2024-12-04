import { View, Text, ActivityIndicator, RefreshControl, Image, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useAppWrite } from '@/hooks/useAppwrite';
import { searchPosts } from '@/lib/appwrite';
import { PostType } from '@/types/Types';
import { colors, images, strings } from '@/constants';
import EmptyState from '@/components/EmptyState';
import SearchInputField from '@/components/SearchInputField';
import VideoCard from '@/components/VideoCard';

const Search = () => {
  const { query } = useLocalSearchParams();
  const searchQuery = query && typeof query === 'string' ? query : '';
  const { data: searchResults, isLoading, refetch } = useAppWrite<PostType[]>(
    () => searchPosts(searchQuery),
  );

  useEffect(() => {
    refetch();
  }, [searchQuery]);

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
        data={searchResults}
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
                  {strings.searchResultText}
                </Text>
                <Text className='text-white font-psemibold text-2xl'>
                  {searchQuery}
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
              placeHolder={strings.searchbarPlaceholderText}
              initialQuery={searchQuery} />
          </View>
        }
        ListEmptyComponent={() => {
          return <EmptyState
            title={strings.emptyViewTitleText}
            subtitle={strings.emptySearchViewSubtitleText} />
        }}
      />
    </SafeAreaView>
  );
};

export default Search;

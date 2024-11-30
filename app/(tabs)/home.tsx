import { View, Text, ScrollView, ActivityIndicator, FlatList, Image, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType, PostType } from '@/types/Types';
import { colors, images, strings } from '@/constants';
import SearchInputField from '@/components/SearchInputField';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts } from '@/lib/appwrite';

const Home = () => {
  const { isLoggedIn, user, isLoading } = useGlobalContext() as GlobalContextType;
  const [searchValue, setSearchValue] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<PostType[] | []>([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const posts: PostType[] = await getAllPosts();
    setPosts(posts);
  }

  const onRefresh = async () => {
    setRefreshing(true);
    getPosts()
    setRefreshing(false);
  }

  const onSearch = (value: string) => {
    console.log('Search value:', value);
  };

  if (isLoading) {
    return (
      <View className='items-center justify-center h-full w-full bg-primary'>
        <ActivityIndicator size="large" color={colors.loadingIndicatorDarkColor} />
      </View>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={[
          { $id: 1, name: 'madhu123' },
          { $id: 2, name: 'madhu123' },
          { $id: 3, name: 'madhu123' },
        ]}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <Text className='text-white'>{item.name}</Text>}
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
              placeHolder={strings.searchbarPlaceholderText}
              value={searchValue}
              onSearch={onSearch}
              onSearchParamsChange={setSearchValue}
            />

            <View className='w-full flex-1 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular -mb-3'>
                {strings.latestVideoTitleText}
              </Text>
            </View>
            <Trending posts={[
              { $id: "1", name: 'madhu123' },
              { $id: "2", name: 'madhu123' },
              { $id: "3", name: 'madhu123' },
            ]} />
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

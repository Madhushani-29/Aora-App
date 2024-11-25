import { View, Text, ScrollView, ActivityIndicator, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType } from '@/types/Types';
import { colors, images, strings } from '@/constants';
import SearchInputField from '@/components/SearchInputField';

const Home = () => {
  const { isLoggedIn, user, isLoading } = useGlobalContext() as GlobalContextType;
  const [searchValue, setSearchValue] = useState(''); // State to manage input value

  const onSearch = (value: string) => {
    console.log('Search value:', value); // You can use this for actual search functionality
  };

  if (isLoading) {
    return (
      <View className='items-center justify-center h-full w-full bg-primary'>
        <ActivityIndicator size="large" color={colors.loadingIndicatorDarkColor} />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className='bg-primary p-4 h-full'>
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

              {/* Pass setSearchValue as the onSearch handler */}
              <SearchInputField
                placeHolder="Search for something..."
                value={searchValue}
                onSearch={onSearch} // Update search value on text change
                onSearchParamsChange={setSearchValue}
              />
            </View>
          }
          ListFooterComponent={<Text className='text-green-400'>Footer</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

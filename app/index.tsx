import CustomButton from '@/components/CustomButton';
import { colors, images, strings } from '@/constants';
import { useGlobalContext } from '@/context/GlobalProvider';
import { GlobalContextType } from '@/types/Types';
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext() as GlobalContextType;

  // if user already logged in 
  // redirect to home page
  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />
  }

  const handlePress = () => {
    router.push('./sign-up')
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView
        //allow the content to grow and enable scrolling if it exceeds the viewport height
        contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className='w-full h-full  items-center px-4'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[130px] h-[84px]' />
          <Image
            source={images.cards}
            resizeMode='contain'
            className='w-full h-[300px] max-w-[380px]' />
          <View
            className='relative m-5'>
            <Text
              className='text-white text-3xl font-bold text-center '>
              {strings.appTitleText} {''}
              <Text
                className='text-secondary-200 text-[30px] font-bold'>
                {strings.appTitleAoraWordText}
              </Text>
            </Text>
            <Image
              source={images.path}
              resizeMode='contain'
              className='w-[136px] h-[15px] absolute -bottom-2 self-center' />
          </View>
          <Text
            className='text-gray-100 mt-[10px] font-pregular text-sm text-center'>
            {strings.appDescriptionText}
          </Text>
          <CustomButton
            handlePress={handlePress}
            title={strings.onboardingButtonText} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App

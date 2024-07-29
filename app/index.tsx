import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  const handlePress = () => { 
    router.push('./sign-in')
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView
        //full width must be scrollable
        //specially mention since it muts be apply for the small screens also same
        contentContainerStyle={{ height: '100%' }}>
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
              className='text-white text-3xl font-bold text-center '>Discover Endless Possibilities with {''}
              <Text
                className='text-secondary-200 text-[30px] font-bold'>Aora</Text>
            </Text>
            <Image
              source={images.path}
              resizeMode='contain'
              className='w-[136px] h-[15px] absolute -bottom-2 self-center' />
          </View>
          <Text
            className='text-gray-100 mt-[10px] font-pregular text-sm text-center'>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>
          <CustomButton
            handlePress={handlePress}
            title="Continue with Email" />
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor={colors.background}
        style='light' />
    </SafeAreaView>
  );
}

export default App

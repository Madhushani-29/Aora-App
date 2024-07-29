import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'

const SignIn = () => {
  const handlePress = () => { }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View
          className='w-full h-full justify-center px-4 my-6 min-h-[85vh]'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px]' />
          <Text className='text-white font-psemibold text-2xl'>Hello</Text>
          <Text className='text-white text-sm'>User Name</Text>
          <Text className='text-white text-sm'>Email</Text>
          <Text className='text-white text-sm'>Password</Text>
          <CustomButton
            handlePress={handlePress}
            title="Sign Up" />
          <Text className='text-white text-sm text-center'>
            Already have an account? {' '}
            <Link href="/sign-up">
              <Text className='text-secondary-100'>Login</Text></Link>

          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import { Link } from 'expo-router'
import SignInForm from '@/forms/auth-forms/sign-in-form'

const SignIn = () => {
  return (
    <SafeAreaView className='bg-blue-500 h-full'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className='w-full h-full px-4 my-6 min-h-[85vh]'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px]' />
          <Text className='text-white font-psemibold text-2xl'>Sign up</Text>
          <SignInForm />
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
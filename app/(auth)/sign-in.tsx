import { View, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { images } from '@/constants'
import { Link } from 'expo-router'
import { AuthSignInType, AuthSignUpType } from '@/types/Types'
import AuthSignInForm from '@/forms/auth-forms/auth-sign-in-form'

const SignIn = () => {
  const onSubmit = (data: AuthSignInType) => {
    console.log(data);
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className='w-full h-full px-4 my-6 min-h-[85vh] flex-1 justify-center'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px] mb-5' />
          <Text className='text-white font-psemibold text-2xl mb-5'>Log In</Text>
          <AuthSignInForm onSubmit={onSubmit} />
          <Text className='text-white text-sm text-center mt-4'>
            Don't have an account? {' '}
            <Link href="/sign-up">
              <Text className='text-secondary-100'>Sign Up</Text></Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
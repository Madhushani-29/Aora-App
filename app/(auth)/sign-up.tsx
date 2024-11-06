import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import { Link } from 'expo-router';
import { AuthSignInType } from '@/types/Types';
import AuthSignUpForm from '@/forms/auth-forms/auth-sign-up-form';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const onSubmit = (data: AuthSignInType) => {
    console.log(data);
    createUser();
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className='w-full h-full px-4 my-6 min-h-[85vh] flex-1 justify-center'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px] mb-5' />
          <Text className='text-white font-psemibold text-2xl mb-5'>Sign up</Text>
          <AuthSignUpForm onSubmit={onSubmit} />
          <Text className='text-white text-sm text-center mt-4'>
            Already have an account? {' '}
            <Link href="/sign-in">
              <Text className='text-secondary-100'>Login</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

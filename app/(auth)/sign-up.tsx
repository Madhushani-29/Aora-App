import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, strings } from '@/constants';
import { Link, router } from 'expo-router';
import { AuthSignUpType } from '@/types/Types';
import AuthSignUpForm from '@/forms/auth-forms/auth-sign-up-form';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ email, password, userName }: AuthSignUpType) => {
    setIsLoading(true);
    try {
      const result = await createUser({ email, password, userName });
      // set it to global state
      router.push("/home");
    }
    catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View className='w-full h-full px-4 my-6 min-h-[85vh] flex-1 justify-center'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[34px] mb-5' />
          <Text className='text-white font-psemibold text-2xl mb-5'>{strings.signUpText}</Text>
          <AuthSignUpForm onSubmit={onSubmit} isLoading={isLoading} />
          <Text className='text-white text-sm text-center mt-4'>
            {strings.signUpHelpText}{' '}
            <Link href="/sign-in">
              <Text className='text-secondary-100'>{strings.logInText}</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

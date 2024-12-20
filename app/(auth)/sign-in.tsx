import { View, Text, Image, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { images, strings } from '@/constants'
import { Link, router } from 'expo-router'
import { AuthSignInType, GlobalContextType, UserType } from '@/types/Types'
import AuthSignInForm from '@/forms/auth-forms/auth-sign-in-form'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext() as GlobalContextType;

  const onSubmit = async ({ email, password }: AuthSignInType) => {
    setIsLoading(true);
    try {
      await signIn({ email, password });
      const result = await getCurrentUser();
      setUser(result as UserType);
      setIsLoggedIn(true);

      router.push("/home");
    }
    catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
    finally {
      setIsLoading(false);
    }
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
          <Text className='text-white font-psemibold text-2xl mb-5'>{strings.logInText}</Text>
          <AuthSignInForm onSubmit={onSubmit} isLoading={isLoading} />
          <Text className='text-white text-sm text-center mt-4'>
            {strings.notSignUpHelpText} {' '}
            <Link href="/sign-up">
              <Text className='text-secondary-100'>{strings.signUpText}</Text></Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
import { Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { strings } from '@/constants'
import { CreatePostType, GlobalContextType, PostType } from '@/types/Types'
import PostCreateForm from '@/forms/post-forms/post-create-form'
import { router } from 'expo-router'
import { createPost } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useGlobalContext() as GlobalContextType;

  const onSubmit = async (data: CreatePostType, reset: () => void) => {
    setIsLoading(true);
    try {
      await createPost(data, user?.$id!);
      Alert.alert(strings.postCreateSuccessAlertTitle, strings.postCreateSuccessAlertContent);
      reset();
      router.push("/home");
    } catch (error) {
      Alert.alert(strings.postCreateFailedAlertTitle, (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 py-6'>
        <Text className='text-white text-2xl font-psemibold mb-10'>
          {strings.createTitle}
        </Text>
        <PostCreateForm
          onSubmit={onSubmit}
          isLoading={isLoading} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
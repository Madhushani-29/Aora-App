import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { strings } from '@/constants'
import { CreatePostType } from '@/types/Types'
import PostCreateForm from '@/forms/post-forms/post-create-form'
import { router } from 'expo-router'
import { createPost } from '@/lib/appwrite'

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit =async (data: CreatePostType) => {
    setIsLoading(true);
    try {
      await createPost(data);
      Alert.alert("Success", "Post Uploaded Successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
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
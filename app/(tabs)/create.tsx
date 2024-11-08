import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Create = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='bg-primary p-4 h-full'>
        <View>
          <Text className='text-white'>Create</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
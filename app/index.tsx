import { Image, ImageSourcePropType, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import { icons } from '@/constants'

const App = () => {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='font-pextrabold'>index</Text>
      <StatusBar style='auto'/>
      <Link href="/home" className='text-blue-600'>Go to Profile</Link>
    </View>
  )
}

export default App

import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View className='flex-1 items-center justify-center bg-primary'>
      <Text className='font-pextrabold'>index</Text>
      <StatusBar style='auto'/>
      <Link href="/profile" className='text-blue-600'>Go to Profile</Link>
    </View>
  )
}

export default App

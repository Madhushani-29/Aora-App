import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@/constants/colors'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='sign-in'
          options={{ headerShown: false }} />
        <Stack.Screen
          name='sign-up'
          options={{ headerShown: false }} />
      </Stack>
      <StatusBar
        backgroundColor={colors.background}
        style='light' />
    </>
  )
}

export default AuthLayout
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types/component-prop-types'
import { colors } from '@/constants'

const CustomButton = ({ handlePress, title, isLoading, containerStyles, labelStyles }: CustomButtonProps) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className={`bg-secondary-100 rounded-xl min-h-[50px] justify-center items-center w-full mt-10 
        ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        onPress={handlePress}
        disabled={isLoading}>
        {
          isLoading
            ? <ActivityIndicator size="large" color={colors.loadingIndicatorLightColor} />
            : <Text
              className='text-primary font-psemibold text-lg '>
              {title}
            </Text>
        }
      </TouchableOpacity>
    </>
  )
}

export default CustomButton
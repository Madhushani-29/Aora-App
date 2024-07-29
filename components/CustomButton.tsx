import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

type CustomButtonProps = {
  handlePress: () => void,
  title: string,
  isLoading?: boolean,
  containerStyles?: string,
  labelStyles?: string
}

const CustomButton = ({ handlePress, title, isLoading, containerStyles, labelStyles }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center w-full mt-7 
        ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      onPress={handlePress}
      disabled={isLoading}>
      <Text
        className={`text-primary font-psemibold text-lg ${labelStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton
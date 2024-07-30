import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SubmitButtonProps } from '@/types/component-prop-types'

const SubmitButton = ({ title, isLoading, }: SubmitButtonProps) => {
    return (
        <>
            <TouchableOpacity
                activeOpacity={0.7}
                className={`bg-secondary-100 rounded-xl min-h-[50px] justify-center items-center w-full mt-7 
         ${isLoading ? 'opacity-50' : ''}`}
                disabled={isLoading}>
                <Text
                    className='text-primary font-psemibold text-lg'>
                    {title}
                </Text>
            </TouchableOpacity >
        </>
    )
}

export default SubmitButton
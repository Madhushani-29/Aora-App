import { View, Text, Image } from 'react-native'
import React from 'react'
import { EmptyStatePropType } from '@/types/component-prop-types'
import { images } from '@/constants'

const EmptyState = ({ title, subtitle }: EmptyStatePropType) => {
    return (
        <View className='justify-center items-center px-4'>
            <Image source={images.empty}
                className="w-[270px] h-[215px]" resizeMode='contain' />
            <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>
            <Text className='font-psemibold text-center text-xl text-white mt-2'>{title}</Text>
        </View>
    )
}

export default EmptyState
import { View, Text } from 'react-native'
import React from 'react'
import { InforBoxPropType } from '@/types/component-prop-types'

const InforBox = ({ title, titleStyles, containerStyles, subtitle }: InforBoxPropType) => {
    return (
        <View className={containerStyles}>
            <Text
                className={`text-white text-center font-psemibold ${titleStyles}`}>
                {title}
            </Text>
            <Text
                className='text-gray-100 text-sm text-center font-pregular'>
                {subtitle}
            </Text>
        </View>
    )
}

export default InforBox
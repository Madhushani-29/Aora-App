import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { TrendingProType } from '@/types/component-prop-types'

const Trending = ({ posts }: TrendingProType) => {
    return (
        <FlatList
            data={posts}
            horizontal
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <Text className='text-white'>{item.name}</Text>} />
    )
}

export default Trending
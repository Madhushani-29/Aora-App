import { Text, FlatList, ViewStyle, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TrendingItemPropType, TrendingProType } from '@/types/component-prop-types';
import * as Animatable from 'react-native-animatable';
import { PostType } from '@/types/Types';
import { icons } from '@/constants';
import { AVPlaybackStatus, AVPlaybackStatusSuccess, ResizeMode, Video } from 'expo-av';

// Custom animations in react-native-animatable are defined as objects where keys represent progress points
// scaleX and scaleY control the scaling along the X-axis and Y-axis, respectively
// Initially, the element is slightly smaller (scaleX: 0.9, scaleY: 0.9).
// Over the animation's duration, it grows to its full size (scaleX: 1, scaleY: 1)
const zoomIn: Animatable.CustomAnimation<ViewStyle> = {
    0: { scaleX: 0.9, scaleY: 0.9 },
    1: { scaleX: 1.1, scaleY: 1.1 },
};

const zoomOut: Animatable.CustomAnimation<ViewStyle> = {
    0: { scaleX: 1, scaleY: 1 },
    1: { scaleX: 0.9, scaleY: 0.9 },
};

const TrendingItem = ({ activeItem, item }: TrendingItemPropType) => {
    const [play, setPlay] = useState(false);


    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem?.$id === item.$id ? (zoomIn as any) : (zoomOut as any)}
            duration={500}
        >
            {play
                ? <Video
                    source={{ uri: item.video }}
                    className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                        if (status.isLoaded && (status as AVPlaybackStatusSuccess).didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
                : <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain' />
                </TouchableOpacity>}
        </Animatable.View>
    );
};

const TrendingPosts = ({ posts }: TrendingProType) => {
    const [activeItem, setActiveItem] = useState<PostType | null>(null);

    useEffect(() => {
        if (posts && posts.length > 0) {
            setActiveItem(posts[0]);
        }
    }, [posts]);

    const viewabilityConfigCallbackPairs = useRef([
        {
            // ensures items are only considered "viewable" when 70% or more of their area is visible
            viewabilityConfig: {
                itemVisiblePercentThreshold: 70,
            },
            onViewableItemsChanged: ({ viewableItems }: any) => {
                if (viewableItems && viewableItems.length > 0) {
                    const centerItem = viewableItems[0];
                    setActiveItem(centerItem.item);
                }
            },
        },
    ]).current;


    if (!posts || posts.length === 0) {
        return <Text className='text-white'>No posts available</Text>;
    }

    return (
        <FlatList
            data={posts}
            horizontal
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem!} item={item} />
            )}

            // initializes the scroll position to a custom horizontal offset 
            // x: 170: Sets the horizontal scroll position so that the list starts scrolled 170 pixels to the right.
            // y: 0: Sets the vertical scroll position. Since this is a horizontal list, y is set to 0 because there’s no vertical scrolling.
            // contentOffset={{
            //     x: 170,
            //     y: 0
            // }}
            // detects changes in the visible items and updates activeItem for animations
            // avoid duplicate callbacks
            // this calls in viewabilityConfigCallbackPairs
            onViewableItemsChanged={null}
            viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
        />
    );
};

export default TrendingPosts;
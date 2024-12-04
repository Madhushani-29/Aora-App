import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'
import { VideoUploadFieldPropType } from '@/types/component-prop-types'
import { ResizeMode, Video } from 'expo-av'
import { icons, images } from '@/constants'
import * as DocumentPicker from 'expo-document-picker';

const VideoUploadField = ({ label, control, name, error }: VideoUploadFieldPropType) => {
    const openPicker = async (onChange: (uri: string) => void) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['video/mp4', 'video/gif']
        });
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            onChange(uri);
        }
    }

    return (
        <View className="space-y-2 mb-4">
            {label && (
                <Text className="text-sm font-semibold text-gray-400 mb-2">
                    {label}
                </Text>
            )}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TouchableOpacity onPress={() => openPicker(onChange)}>
                        {value ?
                            <Video
                                source={{ uri: value }}
                                className='w-full h-64 rounded-2xl'
                                useNativeControls
                                resizeMode={ResizeMode.COVER}
                                isLooping
                            />
                            : <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                                    <Image source={icons.upload}
                                        resizeMode='contain'
                                        className='w-1/2' />
                                </View>
                            </View>
                        }
                    </TouchableOpacity>
                )}
            />
            {error && (
                <Text className="text-xs text-red-500">
                    {error.message}
                </Text>
            )}
        </View>
    )
}

export default VideoUploadField
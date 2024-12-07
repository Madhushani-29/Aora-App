import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'
import { VideoUploadFieldPropType } from '@/types/component-prop-types'
import { ResizeMode, Video } from 'expo-av'
import { icons, images, strings } from '@/constants'
import * as DocumentPicker from 'expo-document-picker';

const ImageUploadField = ({ label, control, name, error }: VideoUploadFieldPropType) => {
    const openPicker = async (onChange: (uri: any) => void) => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['image/png', 'image/jpg', 'image/jpeg']
        });
        if (!result.canceled) {
            const uri = result.assets[0];
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
                            <Image
                                source={{ uri: value.uri }}
                                resizeMode='cover'
                                className='w-full h-64 rounded-2xl' />
                            : <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'>
                                <Image source={icons.upload}
                                    resizeMode='contain'
                                    className='w-5 h-5' />
                                <Text className='text-sm text-gray-100 font-pmedium'>
                                    {strings.imageUploaderHintText}
                                </Text>
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

export default ImageUploadField
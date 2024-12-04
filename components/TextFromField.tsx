import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { FormInputProps } from '@/types/component-prop-types';
import { styled } from 'nativewind';
import { Controller } from 'react-hook-form';

const StyledTextInput = styled(TextInput);

const TextFromField = ({
    name,
    control,
    label,
    placeholder,
    error,
    ...props
}: FormInputProps) => {
    return (
        <View className="space-y-2 mb-4">
            {label && (
                <Text className="text-sm font-semibold text-gray-400">
                    {label}
                </Text>
            )}
            <View
                className={`flex flex-row items-center space-x-4 w-full h-14 px-4 bg-black-100 rounded-2xl border-2 ${error ? 'border-red-500' : 'border-black-200'
                    } focus:border-secondary`}
            >
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <StyledTextInput
                            className="flex-1 text-base text-white font-regular"
                            placeholder={placeholder}
                            placeholderTextColor="#646470"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            {...props}
                        />
                    )}
                />
            </View>
            {error && (
                <Text className="text-xs text-red-500">
                    {error.message}
                </Text>
            )}
        </View>
    );
};

export default TextFromField;

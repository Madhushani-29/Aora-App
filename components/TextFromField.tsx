import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { FormInputProps } from '@/types/component-prop-types';
import { styled } from 'nativewind';
import { Controller } from 'react-hook-form';

const StyledTextInput = styled(TextInput);

const TextFromField = ({ name, control, label, error, ...props }: FormInputProps) => {
    return (
        <View className="mb-4">
            <Text className="block text-gray-700 font-bold mb-2">
                {label}
            </Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <StyledTextInput
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''
                            }`}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        {...props}
                    />
                )}
            />
            {error && (
                <Text className="text-red-500 text-xs italic">{error.message}</Text>
            )}
        </View>
    );
}

export default TextFromField;
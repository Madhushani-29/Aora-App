import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { colors, strings } from '@/constants';
import { PasswordInputProps } from '@/types/component-prop-types';

const PasswordInputField = ({ control, name, error, label, placeholder }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View className="w-full mb-4">
            <Text className="text-sm text-gray-400 font-bold mb-2">
                {label || strings.passwordDefLabel}
            </Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className={`flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 ${error ? 'border-red-500' : 'border-black-200'} focus:border-secondary`}>
                        <TextInput
                            className="text-base text-white flex-1 font-pregular"
                            placeholder={placeholder || strings.passwordDefHint}
                            placeholderTextColor={colors.placeholderTextColor}
                            secureTextEntry={!showPassword}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color={colors.passwordInputIconColor}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
            {error && <Text className="text-red-500 text-xs italic mt-1">{error.message}</Text>}
        </View>
    );
};

export default PasswordInputField;

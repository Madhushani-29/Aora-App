import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { colors, strings } from '@/constants';
import { PasswordInputPorps } from '@/types/component-prop-types';

const PasswordInputField = ({ control, name, error, label, placeholder }: PasswordInputPorps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Text className="block font-bold mb-2 text-gray-500">
                {label ? label : strings.passwordDefLabel}
            </Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <View className={`flex-row flex-wrap items-center bg-primary rounded px-3  border ${error ? 'border-red-500' : ''}`}>
                            <TextInput
                                className="flex-1 text-gray-300 py-2 pr-2"
                                placeholder={placeholder ? placeholder : strings.passwordDefHint}
                                placeholderTextColor={colors.inputFieldHintColor}
                                secureTextEntry={!showPassword}
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={34}
                                    color={colors.passwordInputIconColor}
                                    className="ml-2"
                                />
                            </TouchableOpacity>
                        </View>
                        {error && <Text className="text-red-500 text-xs italic">{error.message}</Text>}
                    </View>
                )}
            />
        </>
    );
};

export default PasswordInputField;
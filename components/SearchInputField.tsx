import { View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SearchInputProps } from '@/types/component-prop-types';
import { styled } from 'nativewind';
import { colors, icons } from '@/constants';
import { Image } from 'react-native';

const StyledTextInput = styled(TextInput);

const SearchInputField = ({
    placeHolder,
    onSearch,
    onSearchParamsChange,
    value,
    ...props
}: SearchInputProps) => {
    return (
        <View className="w-full flex-row items-baseline bg-black-100 rounded-lg">
            <StyledTextInput
                className="flex-1 mb-6 mx-4 text-gray-100 leading-tight focus:outline-secondary-100 focus:shadow-outline"
                onChangeText={onSearchParamsChange}
                value={value}
                placeholder={placeHolder}
                placeholderTextColor={colors.inputFieldHintColor}
                {...props}
            />
            <TouchableOpacity
                className="mr-5"
                onPress={() => onSearch(value)}
            >
                <Image
                    source={icons.search}
                    resizeMode="contain"
                    className="w-5 h-5"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInputField;

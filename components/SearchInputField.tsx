import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { SearchInputProps } from '@/types/component-prop-types';
import { styled } from 'nativewind';
import { colors } from '@/constants';

const StyledTextInput = styled(TextInput);

const SearchInputField = ({
    placeholder,
    onChange,
    value,
    ...props
}: SearchInputProps) => {
    return (
        <View className="w-full items-center flex-row">
            <StyledTextInput
                className={`shadow appearance-none border-none rounded-lg w-full py-3 px-3 text-gray-100 leading-tight focus:outline-secondary-100 focus:shadow-outline bg-black-100`}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={colors.inputFieldHintColor}
                {...props}
            />
        </View>
    );
};

export default SearchInputField;

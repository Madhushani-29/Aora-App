import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SearchInputProps } from '@/types/component-prop-types';
import { styled } from 'nativewind';
import { colors, icons, strings } from '@/constants';
import { Image } from 'react-native';
import { usePathname } from 'expo-router';
import useAppToast from '@/hooks/useAppToasts';

const StyledTextInput = styled(TextInput);

const SearchInputField = ({
    placeHolder,
    initialQuery,
    ...props
}: SearchInputProps) => {
    // const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");
    const showToast = useAppToast();

    return (
        <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder={placeHolder}
                placeholderTextColor="#CDCDE0"
                onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity
                onPress={() => {
                    console.log(query);

                    if (query === "")
                        return Alert.alert(
                            strings.queryEmptyAlertTitle,
                            strings.queryEmptyAlertContent
                        );
                    // if (pathname.startsWith("/search")) router.setParams({ query });
                    // else router.push(`/search/${query}`);

                }}
            >
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInputField;

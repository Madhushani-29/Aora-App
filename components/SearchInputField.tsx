import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SearchInputProps } from '@/types/component-prop-types';
import { colors, icons, strings } from '@/constants';
import { Image } from 'react-native';
import { router, usePathname } from 'expo-router';

const SearchInputField = ({
    placeHolder,
    initialQuery,
    ...props
}: SearchInputProps) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder={placeHolder}
                placeholderTextColor={colors.placeholderTextColor}
                onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity
                onPress={() => {
                    if (query === "")
                        return Alert.alert(
                            strings.queryEmptyAlertTitle,
                            strings.queryEmptyAlertContent
                        );
                    if (pathname.startsWith("/search"))
                        router.setParams({ query });
                    else router.push(`/search/${query}`);

                }}
            >
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInputField;

import { View, Text } from 'react-native'
import React from 'react'
import { FieldError, useForm } from 'react-hook-form';
import { initialValuePostCreateForm } from '@/constants/form-initial-values';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPostFormValidationSchema } from '@/validations/validationSchema';
import TextFromField from '@/components/TextFromField';
import { CreatePostFormPropType } from '@/types/form-prop-type';
import CustomButton from '@/components/CustomButton';
import VideoUploadField from '@/components/VideoUploadField';
import ImageUploadField from '@/components/ImageUploadField';
import { strings } from '@/constants';
import { CreatePostType } from '@/types/Types';

const PostCreateForm = ({ onSubmit, isLoading }: CreatePostFormPropType) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValuePostCreateForm,
        resolver: yupResolver(createPostFormValidationSchema),
    });

    const handleFormSubmit = (data: CreatePostType) => {
        onSubmit(data, reset);
    };
    return (
        <View>
            <TextFromField
                label={strings.titleLabel}
                control={control}
                name="title"
                error={errors.title}
                placeholder={strings.titlePlaceholder}
            />
            <VideoUploadField
                control={control}
                label={strings.videoLabel}
                name='video'
                error={errors.video as FieldError} />
            <ImageUploadField
                label={strings.thumbnailtitleText}
                control={control}
                name="thumbnail"
                error={errors.thumbnail as FieldError} />
            <TextFromField
                label={strings.promptLabel}
                control={control}
                name="prompt"
                error={errors.prompt}
                placeholder={strings.promptPlaceholder}
            />

            <CustomButton
                title={strings.createPostButtonText}
                handlePress={handleSubmit(handleFormSubmit)}
                isLoading={isLoading} />
        </View>
    )
}

export default PostCreateForm
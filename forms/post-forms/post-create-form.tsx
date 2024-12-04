import { View, Text } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form';
import { initialValuePostCreateForm } from '@/constants/form-initial-values';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPostFormValidationSchema } from '@/validations/validationSchema';
import TextFromField from '@/components/TextFromField';
import { CreatePostFormPropType } from '@/types/form-prop-type';
import CustomButton from '@/components/CustomButton';
import VideoUploadField from '@/components/VideoUploadField';
import ImageUploadField from '@/components/ImageUploadField';

const PostCreateForm = ({ onSubmit, isLoading }: CreatePostFormPropType) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValuePostCreateForm,
        resolver: yupResolver(createPostFormValidationSchema),
    });
    return (
        <View>
            <TextFromField
                label="Video Title"
                control={control}
                name="title"
                error={errors.title}
                placeholder="Enter your title"
            />
            <VideoUploadField
                control={control}
                label='Upload Video'
                name='video'
                error={errors.video} />
            <ImageUploadField
                label="Thumbnail Image"
                control={control}
                name="thumbnail"
                error={errors.thumbnail} />
            <TextFromField
                label="AI Prompt"
                control={control}
                name="prompt"
                error={errors.prompt}
                placeholder="Enter your prompt"
            />

            <CustomButton
                title="Submit & Publish"
                handlePress={handleSubmit(onSubmit)}
                isLoading={isLoading} />
        </View>
    )
}

export default PostCreateForm
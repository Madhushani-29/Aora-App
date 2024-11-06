import { View, Alert, Button, } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSignUpFormValidationSchema } from '@/validations/validationSchema';
import TextFromField from '@/components/TextFromField';
import { initialValueSignUpForm } from '@/constants/form-initial-values';
import CustomButton from '@/components/CustomButton';
import PasswordInputField from '@/components/PassportInputField';
import { AuthSignUpFormPropType } from '@/types/form-prop-type';

const AuthSignUpForm = ({ onSubmit, isLoading }: AuthSignUpFormPropType) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValueSignUpForm,
    resolver: yupResolver(authSignUpFormValidationSchema),
  });

  return (
    <View className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <TextFromField
        label="Username"
        type="text"
        control={control}
        name="userName"
        error={errors.userName}
        placeholder="Enter user name"
      />
      <TextFromField
        label="Email"
        type="email"
        control={control}
        name="email"
        error={errors.email}
        placeholder="Enter email"
      />
      <PasswordInputField
        label="Password"
        control={control}
        name="password"
        error={errors.password} />
      <View className="flex items-center justify-between">
        <CustomButton title="Submit" handlePress={handleSubmit(onSubmit)} isLoading={isLoading} />
      </View>
    </View>
  );
}

export default AuthSignUpForm
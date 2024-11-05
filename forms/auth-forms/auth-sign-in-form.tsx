import { View } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFromField from '@/components/TextFromField';
import { AuthFormPropType } from '@/types/form-prop-type';
import CustomButton from '@/components/CustomButton';
import PasswordInputField from '@/components/PassportInputField';
import { initialValueSignInForm } from '@/constants/form-initial-values';
import { authSignInFormValidationSchema } from '@/validations/validationSchema';

const AuthSignInForm = ({ onSubmit }: AuthFormPropType) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValueSignInForm,
    resolver: yupResolver(authSignInFormValidationSchema),
  });

  return (
    <View className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
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
        <CustomButton title="Submit" handlePress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

export default AuthSignInForm
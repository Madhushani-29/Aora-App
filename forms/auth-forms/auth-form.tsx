import { View, Alert, Button, } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInFormValidationSchema } from '@/validations/validationSchema';
import TextFromField from '@/components/TextFromField';
import { initialValueaAuthForm } from '@/constants/form-initial-values';
import { AuthType } from '@/types/Types';
import { AuthFormPropType } from '@/types/form-prop-type';

const AuthForm = ({ onSubmit }: AuthFormPropType) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValueaAuthForm,
    resolver: yupResolver(signInFormValidationSchema),
  });

  return (
    <View className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <TextFromField
        label="Email"
        type="email"
        control={control}
        name="email"
        error={errors.email}
      />

      <TextFromField
        label="Username"
        type="text"
        control={control}
        name="userName"
        error={errors.userName}
      />

      <TextFromField
        label="Password"
        type="password"
        control={control}
        name="password"
        error={errors.password}
      />
      <TextFromField
        label="Password"
        type="password"
        control={control}
        name="password"
        error={errors.password}
      />
      <TextFromField
        label="Password"
        type="password"
        control={control}
        name="password"
        error={errors.password}
      />
      <TextFromField
        label="Password"
        type="password"
        control={control}
        name="password"
        error={errors.password}
      />
      <TextFromField
        label="Password"
        type="password"
        control={control}
        name="password"
        error={errors.password}
      />
      <TextFromField
        label="Password"
        type="password"
        control={control}
        name="password"
        error={errors.password}
      />

      <View className="flex items-center justify-between">
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

export default AuthForm
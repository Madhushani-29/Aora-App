import { View } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFromField from '@/components/TextFromField';
import CustomButton from '@/components/CustomButton';
import PasswordInputField from '@/components/PasswordInputField';
import { initialValueSignInForm } from '@/constants/form-initial-values';
import { authSignInFormValidationSchema } from '@/validations/validationSchema';
import { AuthSignInFormPropType, AuthSignUpFormPropType } from '@/types/form-prop-type';
import { strings } from '@/constants';

const AuthSignInForm = ({ onSubmit, isLoading }: AuthSignInFormPropType) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValueSignInForm,
    resolver: yupResolver(authSignInFormValidationSchema),
  });

  return (
    <View className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <TextFromField
        label={strings.emailLabelText}
        type="email"
        control={control}
        name="email"
        error={errors.email}
        placeholder={strings.emailHintText}
      />
      <PasswordInputField
        label={strings.passwordDefLabel}
        control={control}
        name="password"
        error={errors.password} />
      <View className="flex items-center justify-between">
        <CustomButton
          title={strings.logInText}
          handlePress={handleSubmit(onSubmit)}
          isLoading={isLoading} />
      </View>
    </View>
  );
}

export default AuthSignInForm
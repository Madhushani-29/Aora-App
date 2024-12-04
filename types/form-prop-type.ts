import { AuthSignInType, AuthSignUpType, CreatePostType } from "./Types";

export type AuthSignInFormPropType = {
  onSubmit: (data: AuthSignInType) => void;
  isLoading: boolean;
};

export type AuthSignUpFormPropType = {
  onSubmit: (data: AuthSignUpType) => void;
  isLoading: boolean;
};

export type CreatePostFormPropType = {
  onSubmit: (data: CreatePostType) => void;
  isLoading: boolean;
};

import {
  AuthSignInType,
  AuthSignUpType,
  CreatePostType,
  PostType,
} from "./Types";

export type AuthSignInFormPropType = {
  onSubmit: (data: AuthSignInType) => void;
  isLoading: boolean;
};

export type AuthSignUpFormPropType = {
  onSubmit: (data: AuthSignUpType) => void;
  isLoading: boolean;
};

export type CreatePostFormPropType = {
  onSubmit: (data: CreatePostType, reset: () => void) => void;
  isLoading: boolean;
};

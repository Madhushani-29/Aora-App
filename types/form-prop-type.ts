import { AuthSignInType, AuthSignUpType } from "./Types";

export type AuthSignInFormPropType = {
  onSubmit: (data: AuthSignInType) => void;
  isLoading: boolean;
};

export type AuthSignUpFormPropType = {
  onSubmit: (data: AuthSignUpType) => void;
  isLoading: boolean;
};

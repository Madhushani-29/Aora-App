import { AuthSignInType, AuthSignUpType } from "./Types";

export type AuthFormPropType = {
  onSubmit: (data: AuthSignInType | AuthSignUpType) => void;
};

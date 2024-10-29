import { AuthType } from "./Types";

export type AuthFormPropType = {
  onSubmit: (data: AuthType) => void;
};

import { AuthSignInType, AuthSignUpType, CreatePostType } from "@/types/Types";

export const initialValueSignInForm: AuthSignInType = {
  email: "",
  password: "",
};

export const initialValueSignUpForm: AuthSignUpType = {
  email: "",
  userName: "",
  password: "",
};

export const initialValuePostCreateForm: CreatePostType = {
  prompt: "",
  thumbnail: "",
  title: "",
  video: "",
};

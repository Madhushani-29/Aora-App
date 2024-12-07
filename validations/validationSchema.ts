import * as yup from "yup";
import { PASSWORD_REGEX, USERNAME_REGEX } from "./regexPatterns";

export const authSignUpFormValidationSchema = yup.object({
  userName: yup
    .string()
    .matches(
      USERNAME_REGEX,
      "Username must start with a letter and contain only letters and numbers"
    )
    .required("User name is required."),
  email: yup
    .string()
    .email("This is not a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

export const authSignInFormValidationSchema = yup.object({
  email: yup
    .string()
    .email("This is not a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .matches(
      PASSWORD_REGEX,
      "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

export const createPostFormValidationSchema = yup.object({
  prompt: yup.string().required("Prompt is required."),
  thumbnail: yup.mixed().required("Thumbnail is required."),
  title: yup.string().required("Title is required."),
  video: yup.mixed().required("Video is required."),
});

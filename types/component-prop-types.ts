import { ReactNode } from "react";
import { Control, FieldError } from "react-hook-form";
import { PostType } from "./Types";

export type FormInputProps = {
  name: string;
  control: Control<any>;
  label: string;
  type: string;
  error?: FieldError;
  placeholder?: string;
};

export type SearchInputProps = {
  placeHolder?: string;
  [key: string]: any;
  initialQuery?: string;
};

export type CustomButtonProps = {
  handlePress: (...args: any[]) => void;
  title: string;
  isLoading?: boolean;
  containerStyles?: string;
  labelStyles?: string;
};

export type SubmitButtonProps = {
  title: string;
  isLoading?: boolean;
};

export type PasswordInputPorps = {
  control: Control<any>;
  error?: FieldError;
  name: string;
  label?: string;
  placeholder?: string;
};

export type GlobalProviderProps = {
  children: ReactNode;
};

export type TrendingProType = {
  posts: PostType[];
};

export type TrendingItemPropType = {
  activeItem: PostType;
  item: PostType;
};

export type EmptyStatePropType = {
  title: string;
  subtitle: string;
};

export type ToastPropType = {
  text: string;
  type?: "normal" | "success" | "warning" | "danger" | "custom";
};

export type VideoPopType = {
  title: string;
  thumbnail: string;
  video: string;
  creator: string;
  avatar: string;
};

export type InforBoxPropType = {
  title: string;
  titleStyles?: string;
  containerStyles?: string;
  subtitle?: string;
};

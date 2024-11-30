import { ReactNode } from "react";
import { Control, FieldError } from "react-hook-form";

export type FormInputProps = {
  name: string;
  control: Control<any>;
  label: string;
  type: string;
  error?: FieldError;
  placeholder?: string;
};

export interface SearchInputProps {
  name?: string;
  label?: string;
  placeHolder?: string;
  error?: { message: string };
  value: string;
  onSearchParamsChange: (value: string) => void;
  onSearch: (value: string) => void;
  [key: string]: any;
}

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
  posts: Posts[];
};

type Posts = {
  $id: string;
  name: string;
};

export type EmptyStatePropType = {
  title: string;
  subtitle: string;
};

export type ToastPropType = {
  text: string;
  type?: "normal" | "success" | "warning" | "danger" | "custom";
};

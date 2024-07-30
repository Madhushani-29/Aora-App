import { Control, FieldError} from "react-hook-form";

export type FormInputProps = {
  name:string,
  control:Control<any>, 
  label: string;
  type:string;
  error?: FieldError;
};

export type CustomButtonProps = {
  handlePress: () => void;
  title: string;
  isLoading?: boolean;
  containerStyles?: string;
  labelStyles?: string;
};

export type SubmitButtonProps = {
  title: string;
  isLoading?: boolean;
};

import { ToastPropType } from "@/types/component-prop-types";
import { useToast } from "react-native-toast-notifications";

const useAppToast = () => {
  const toast = useToast();

  const showToast = ({ text, type="success" }: ToastPropType) => {
    toast.show(text, {
      type,
      placement: "bottom",
      duration: 4000,
      animationType: "slide-in",
    });
  };

  return showToast;
};

export default useAppToast;
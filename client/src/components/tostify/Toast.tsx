import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import toastConfig from "components/tostify/Toast.config";

const Toast = (type: string, title: string) => {
  if (type === "success") {
    toast.success(title, toastConfig);
  } else if (type === "danger") {
    toast.error(title, toastConfig);
  }
};

export default Toast;

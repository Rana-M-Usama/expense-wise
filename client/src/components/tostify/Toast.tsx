import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import toastStyle from "components/tostify/Toast.styles";

const Toast = (type: string, title: string) => {
  if (type === "success") {
    toast.success(title, toastStyle);
  } else if (type === "danger") {
    toast.error(title, toastStyle);
  }
};

export default Toast;

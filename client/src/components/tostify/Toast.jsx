import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Toast = (type, title) => {
  const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  if (type === "success") {
    toast.success(title, { ...toastConfig });
  } else if (type === "danger") {
    toast.error(title, { ...toastConfig });
  }
};

export default Toast;

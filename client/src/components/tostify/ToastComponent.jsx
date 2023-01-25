import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { ToastContainer } from "react-toastify";

const ToastComponent = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastComponent;

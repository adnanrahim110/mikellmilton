"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastHost() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1800}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable={false}
      theme="light"
    />
  );
}

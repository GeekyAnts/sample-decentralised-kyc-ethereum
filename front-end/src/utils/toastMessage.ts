import { toast } from "react-toastify";

export const toastSuccess = (message: string) => {
  return toast.success(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 2000,
    draggablePercent: 60,
  });
};

export const toastError = (message: string) => {
  return toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1000,
    draggablePercent: 60,
  });
};

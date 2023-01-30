import { toast } from "vue3-toastify";

export const toastSuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};

export const toastError = (err) => {
  toast.error(`${err.message}`, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
  });
};

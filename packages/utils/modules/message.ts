import 'react-toastify/dist/ReactToastify.css'

import { toast, ToastContainer, ToastOptions } from 'react-toastify'

const toastDefaultOptions: ToastOptions = {
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: 'dark'
}

export const toastSuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...toastDefaultOptions, ...options })
}
export const toastError = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...toastDefaultOptions, ...options })
}
export const toastWarn = (message: string, options?: ToastOptions) => {
  toast.warn(message, { ...toastDefaultOptions, ...options })
}

export { ToastContainer }

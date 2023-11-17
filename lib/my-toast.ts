import { toast } from "react-toastify"

export const toastSuccess = (message : string) => {
    toast.success(message || 'Successfully', { 
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}
export const toastWarning = (message : string) => {
    toast.warn(message || 'Warning', { 
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}
export const toastError = (message : string) => {
    toast.error(message || 'Failed', { 
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}
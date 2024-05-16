import { toast, type ToastType } from "vue3-toastify"

const bToast = (message: string, type?: ToastType) => {
	toast(message, {
		type: type ?? 'success'
	})
}

export default bToast
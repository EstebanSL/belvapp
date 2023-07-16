import { toast } from 'react-hot-toast';
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'bottom-center',
  })
}

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'bottom-center',
    duration: 3000,
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
      fontFamily: 'Montserrat, sans-serif',
    },
  })
}
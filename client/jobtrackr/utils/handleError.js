import React from 'react'
import { toast } from 'react-toastify'
const handleError = (err,fallback='Something went wrong') => {
  return toast.error(err.response?.data?.message||fallback);
}

export default handleError

import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const useErrors = (errors = []) => {

    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) fallback()
                else {
                    toast.error(error?.data?.message || "something went wrong")
                }
            }

        })
    }, [errors])
}

const useCustomMutation = (mutation) => {
    const [mutate] = mutation();

    const [data, setData] = useState(null)
    const [isLoading, setisLoading] = useState(false)

    const exucuteMutate = async (toastMessage, ...args) => {
        setisLoading(true)

        const toastId = toast.loading(toastMessage || "Updating data...")
        try {
            const res = await mutate(...args)
            if (res.data) {
                toast.success(res?.data?.message || "Data Updated Successfully", {
                    id: toastId
                })
                setData(res.data)
            } else {
                toast.error(res?.error?.data?.message || "Somethong went wrong", {
                    id: toastId
                })
                setData(res.error.data)

            }
        } catch (err) {
            toast.error(err?.message || "Somethong went wrong", {
                id: toastId
            })
            console.log(err)

        } finally {
            setisLoading(false)
        }
    }

    return [exucuteMutate, isLoading, data]

}


const useSocketEvents = (socket, eventListeners) => {
    useEffect(() => {
        Object.entries(eventListeners).forEach(([event, handler]) => {
            socket.on(event, handler)
        })

        return () => {
            Object.entries(eventListeners).forEach(([event, handler]) => {
                socket.off(event, handler)
            })
        }
    }, [socket, eventListeners])
}

export { useErrors, useCustomMutation, useSocketEvents }
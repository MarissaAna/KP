import { useContext } from "react";
import { toastContext } from "../context/ToastContext";

/**
 * Custom hook for accessing the toast context.
 * @returns {Object} An object containing the toast content, showToast function, and closeToast function.
 * @throws {Error} Throws an error if the toast context is not found.
 */
const useToast = () => {
  const contextValue = useContext(toastContext);

  if (!contextValue)
    throw new Error("Toast context must be inside it's provider !");

  const { toastContent, showToast, closeToast } = contextValue;

  return { toastContent, showToast, closeToast };
};

export default useToast;

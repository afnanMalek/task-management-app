import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to show success messages
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};

// Function to show error messages
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  });
};

// LocalStorage Utility Functions
export const setItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item in localStorage", error);
    showErrorToast("Failed to save data!"); // Show error toast
  }
};

export const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting item from localStorage", error);
    showErrorToast("Failed to retrieve data!"); // Show error toast
    return null;
  }
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from localStorage", error);
    showErrorToast("Failed to remove data!"); // Show error toast
  }
};

export const removeAll = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage", error);
    showErrorToast("Failed to clear data!"); // Show error toast
  }
};

// Status Mapping
export const statusMapping = {
  pending: { id: 1, label: "Pending" },
  "in-progress": { id: 2, label: "In Progress" },
  completed: { id: 3, label: "Completed" },
};

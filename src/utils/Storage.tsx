// utils/storage.ts

export const setItem = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in localStorage", error);
    }
  };
  
  export const getItem = (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting item from localStorage", error);
      return null;
    }
  };
  
  export const removeItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage", error);
    }
  };
  
  export const removeAll = () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  };
  

export const statusMapping = {
    "pending": { id: 1, label: "Pending" },
    "in-progress": { id: 2, label: "In Progress" },
    "completed": { id: 3, label: "Completed" },
  };
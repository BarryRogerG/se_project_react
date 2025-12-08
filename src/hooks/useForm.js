import { useState, useCallback, useRef } from "react";

/**
 * Custom hook for managing form state
 * @param {Object} initialValues - Initial values for form fields
 * @returns {Object} Form values, handlers, and reset function
 */
export const useForm = (initialValues = {}) => {
  // Use ref to store initial values to avoid infinite loops
  const initialValuesRef = useRef(initialValues);
  
  // Update ref when initialValues change (but only if the object reference changes)
  if (initialValuesRef.current !== initialValues) {
    initialValuesRef.current = initialValues;
  }
  
  const [values, setValues] = useState(initialValues);

  // Handle input change
  const handleChange = useCallback((e) => {
    const target = e.target;
    if (!target) return;
    
    const { name, value } = target;
    if (!name) {
      console.warn('Input element missing name attribute:', target);
      return;
    }
    
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValuesRef.current);
  }, []);

  // Set form values manually (useful for setting initial values)
  const setFormValues = useCallback((newValues) => {
    setValues((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  }, []);

  return {
    values,
    handleChange,
    resetForm,
    setFormValues,
  };
};


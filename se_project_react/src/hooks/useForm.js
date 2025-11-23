import { useState, useCallback } from "react";

/**
 * Custom hook for managing form state
 * @param {Object} initialValues - Initial values for form fields
 * @returns {Object} Form values, handlers, and reset function
 */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

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


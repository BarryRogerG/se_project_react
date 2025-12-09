import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Custom hook for managing form state
 * @param {Object} initialValues - Initial values for form fields
 * @returns {Object} Form values, handlers, and reset function
 */
export const useForm = (initialValues = {}) => {
  // Use ref to store initial values to avoid infinite loops
  const initialValuesRef = useRef(initialValues);
  
  // Update ref when initialValues change
  useEffect(() => {
    initialValuesRef.current = initialValues;
  }, [initialValues]);
  
  const [values, setValues] = useState(initialValues);

  // Handle input change
  const handleChange = useCallback((e) => {
    console.log('useForm handleChange called', e);
    const target = e.target;
    if (!target) {
      console.warn('useForm: No target in event', e);
      return;
    }
    
    const { name, value } = target;
    if (!name) {
      console.warn('Input element missing name attribute:', target);
      return;
    }
    
    console.log('useForm: Updating', name, 'to', value);
    setValues((prevValues) => {
      const newValues = {
        ...prevValues,
        [name]: value,
      };
      console.log('useForm: New values', newValues);
      return newValues;
    });
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


// React imports
import React, { useEffect } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// Hooks
import { useForm } from "../../hooks/useForm";

const LoginModal = ({ isOpen, onLogin, onCloseModal }) => {
  // Use the useForm hook to manage form state
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  // handleSubmit calls onLogin with form data
  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onLogin with appropriate arguments
    onLogin(values);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Log in"
      name="login"
      buttonText="Log in"
      onSubmit={handleSubmit}
    >
      {/* the contents of the form will go in here */}
      <div className="modal__input-group">
        <label htmlFor="login-email" className="modal__label">
          Email
        </label>
        <input
          type="email"
          id="login-email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="modal__input-group">
        <label htmlFor="login-password" className="modal__label">
          Password
        </label>
        <input
          type="password"
          id="login-password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;

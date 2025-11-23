// React imports
import React, { useEffect } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// Hooks
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onRegister, onCloseModal }) => {
  // Use the useForm hook to manage form state
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  // handleSubmit calls onRegister with form data
  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onRegister with appropriate arguments
    onRegister(values);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Sign up"
      name="register"
      buttonText="Next"
      onSubmit={handleSubmit}
    >
      {/* the contents of the form will go in here */}
      <div className="modal__input-group">
        <label htmlFor="register-name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          id="register-name"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="modal__input-group">
        <label htmlFor="register-avatar" className="modal__label">
          Avatar URL
        </label>
        <input
          type="url"
          id="register-avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="modal__input-group">
        <label htmlFor="register-email" className="modal__label">
          Email
        </label>
        <input
          type="email"
          id="register-email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="modal__input-group">
        <label htmlFor="register-password" className="modal__label">
          Password
        </label>
        <input
          type="password"
          id="register-password"
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

export default RegisterModal;


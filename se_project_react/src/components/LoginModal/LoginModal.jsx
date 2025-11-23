// React imports
import React, { useState, useEffect } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onLogin, onCloseModal }) => {
  // declare state for each input field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use a useEffect hook to reset the input field state to empty
  // when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // handleSubmit calls onLogin with form data
  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onLogin with appropriate arguments
    onLogin({ email, password });
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
        <label htmlFor="email" className="modal__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="modal__input-group">
        <label htmlFor="password" className="modal__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;

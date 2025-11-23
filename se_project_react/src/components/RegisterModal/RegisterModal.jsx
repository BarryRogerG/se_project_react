// React imports
import React, { useState, useEffect } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onRegister, onCloseModal }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // use a useEffect hook to reset the input field state to empty
  // when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // handleSubmit calls onRegister with form data
  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onRegister with appropriate arguments
    onRegister({ name, avatar, email, password });
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
        <label htmlFor="name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div className="modal__input-group">
        <label htmlFor="avatar" className="modal__label">
          Avatar URL
        </label>
        <input
          type="url"
          id="avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </div>

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

export default RegisterModal;


// React imports
import React, { useState, useEffect, useContext } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// Contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onEditProfile, onCloseModal }) => {
  const currentUser = useContext(CurrentUserContext);
  
  // declare state for each input field
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // use a useEffect hook to populate the form with current user data
  // when the modal is opened or currentUser changes
  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  // handleSubmit calls onEditProfile with form data
  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onEditProfile with appropriate arguments
    onEditProfile({ name, avatar });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
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
    </ModalWithForm>
  );
};

export default EditProfileModal;


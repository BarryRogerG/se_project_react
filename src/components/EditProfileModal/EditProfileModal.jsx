// React imports
import React, { useEffect, useContext } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// Contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// Hooks
import { useForm } from "../../hooks/useForm";

const EditProfileModal = ({ isOpen, onEditProfile, onCloseModal }) => {
  const currentUser = useContext(CurrentUserContext);
  
  // Use the useForm hook to manage form state
  const { values, handleChange, setFormValues } = useForm({
    name: "",
    avatar: "",
  });

  // Populate form with current user data when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setFormValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentUser]);

  // handleSubmit calls onEditProfile with form data
  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onEditProfile with appropriate arguments
    onEditProfile(values);
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
        <label htmlFor="editProfile-name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          id="editProfile-name"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="modal__input-group">
        <label htmlFor="editProfile-avatar" className="modal__label">
          Avatar URL
        </label>
        <input
          type="url"
          id="editProfile-avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;


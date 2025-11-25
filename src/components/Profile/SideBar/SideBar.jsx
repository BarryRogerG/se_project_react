import React, { useContext } from "react";
import "./SideBar.css";
import userAvatar from "../../../assets/avatar.png";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name || "User"}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <button
        type="button"
        className="sidebar__edit-button"
        onClick={onEditProfile}
      >
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__signout-button"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </div>
  );
}

export default SideBar;

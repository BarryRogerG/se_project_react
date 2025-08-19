import React from "react";
import "./SideBar.css";
import userAvatar from "../../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          className="sidebar__avatar"
          src={userAvatar}
          alt="Terrence Tegegne"
        />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default SideBar;

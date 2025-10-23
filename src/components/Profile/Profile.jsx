// React imports
import React from "react";

// Components
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

// Styles
import "./Profile.css";

function Profile({ clothingItems, onAddItem, onItemClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddItem={onAddItem}
        onItemClick={onItemClick}
      />
    </div>
  );
}

export default Profile;

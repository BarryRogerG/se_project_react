import React from "react";
import "./Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

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

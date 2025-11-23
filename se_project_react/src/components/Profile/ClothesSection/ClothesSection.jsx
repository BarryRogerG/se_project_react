// React imports
import React, { useContext } from "react";

// Components
import ItemCard from "../../ItemCard/ItemCard";

// Contexts
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

// Styles
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onAddItem, onItemClick }) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items to show only those added by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          type="button"
          className="clothes-section__add-button"
          onClick={onAddItem}
        >
          + Add new
        </button>
      </div>

      <div className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard key={item._id} item={item} onItemClick={onItemClick} />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;

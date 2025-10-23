// React imports
import React from "react";

// Components
import ItemCard from "../../ItemCard/ItemCard";

// Styles
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onAddItem, onItemClick }) {
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
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onItemClick={onItemClick} />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;

import React from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";

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
          <ItemCard key={item.id} item={item} onItemClick={onItemClick} />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;

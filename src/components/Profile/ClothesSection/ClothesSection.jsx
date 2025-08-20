import React from "react";
import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import { defaultClothingItems } from "../../../utils/constants";

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
        {/* Display user's added clothing items first */}
        {clothingItems.map((item, index) => (
          <ItemCards
            key={`user-${item.name}-${index}`}
            item={item}
            onItemClick={onItemClick}
          />
        ))}
        {/* Display default clothing items */}
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={`default-${item._id}`}
            item={item}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;

import React, { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onItemClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  // Create a variable which you then set in className for the like button
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  // Handle like button click
  const handleLike = (e) => {
    e.stopPropagation(); // Prevent card click when clicking like button
    if (onCardLike && currentUser) {
      onCardLike({ id: item._id, isLiked });
    }
  };

  return (
    <li className="card" onClick={handleClick}>
      <h2 className="card_name">{item.name}</h2>
      <img
        className="card_image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
      {currentUser && (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
          aria-label={isLiked ? "Unlike" : "Like"}
        />
      )}
    </li>
  );
}

export default ItemCard;

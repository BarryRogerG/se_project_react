import "./ItemCard.css";

function ItemCard({ item, onItemClick }) {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <li className="card" onClick={handleClick}>
      <h2 className="card_name">{item.name}</h2>
      <img className="card_image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;

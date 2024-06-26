import s from "./ProductCard.module.css";
export const ProductCard = ({
  item,
  handleAddToCart,
  openModalWithProduct,
}) => {
  return (
    <li className={s.card}>
      <img src={item.thumbnail} />
      <div className={s.content}>
        <h2>{item.title}</h2>
        <span>{item.price}$</span>
        <button onClick={() => openModalWithProduct(item)}>See more</button>
        <button onClick={() => handleAddToCart(item)}>Add to cart</button>
      </div>
    </li>
  );
};

import s from "./ProductCard.module.css"
export const ProductCard = ({item, handleAddToCart}) => {
  return (
    <li className={s.card}>
        <img src={item.thumbnail} />
          <div className={s.content}>
            <h2>{item.title}</h2>
            <span>{item.price}$</span>
            <button onClick={()=>handleAddToCart(item)}>Add to cart</button>
        </div>
    </li>
  )
}

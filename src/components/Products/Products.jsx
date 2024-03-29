import { useEffect, useState } from "react";
import productsData from "../../assets/products.json";
import { ProductCard } from "../ProductCard/ProductCard";
import s from "./Products.module.css";
import Modal from "../Modal/Modal";

const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState(() => {
    const savedData = JSON.parse(window.localStorage.getItem("cart"));
    if (savedData?.length) {
      return savedData;
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };
  const handleDeleteFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getFilteredDate = () => {
    return products.filter((item) =>
      item.title.toLocaleLowerCase().includes(searchStr.toLocaleLowerCase())
    );
  };
  const filteredDate = getFilteredDate();

  return (
    <>
      <header className={s.header}>
        <div>Logo</div>
        <input
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          type="text"
          placeholder="Enter product name"
        />
        <button onClick={toggleModal}>Cart</button>
      </header>
      <ul className={s.list}>
        {filteredDate.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </ul>

      {isOpen && (
        <Modal closeModal={toggleModal}>
          <h2>CART</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.title} {item.price}$
                <button onClick={() => handleDeleteFromCart(item.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  );
};

export default Products;

import { useEffect, useState } from "react";
import productsData from "../../assets/products.json";
import { ProductCard } from "../ProductCard/ProductCard";
import s from "./Products.module.css";
import Modal from "../Modal/Modal";
import { TiShoppingCart } from "react-icons/ti";

const Products = () => {
  const [products] = useState(productsData);
  const [cart, setCart] = useState(() => {
    const savedData = JSON.parse(window.localStorage.getItem("cart"));
    if (savedData?.length) {
      return savedData;
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenViewMore, setIsOpenViewMore] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [contentModal, setcontentModal] = useState({});

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const openModalWithProduct = (product) => {
    setcontentModal(product);

    setIsOpenViewMore(true);
  };
  const closeModalWithProduct = () => {
    setIsOpenViewMore(false);
  };

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
        <div>DRV Store</div>
        <input
          className={s.input}
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          type="text"
          placeholder="Enter product name"
        />
        <button onClick={toggleModal}>
          <TiShoppingCart />
        </button>
      </header>
      <ul className={s.list}>
        {filteredDate.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            handleAddToCart={handleAddToCart}
            openModalWithProduct={openModalWithProduct}
          />
        ))}
      </ul>
      {isOpenViewMore && (
        <Modal closeModal={closeModalWithProduct}>
          <img src={contentModal.thumbnail} width="400" />
          <h2>{contentModal.title}</h2>
          <h2>{contentModal.description}</h2>
          <p>Brand:{contentModal.brand}</p>
          <p>Category:{contentModal.category}</p>
          <p>Rating:{contentModal.rating}</p>
        </Modal>
      )}

      {isOpen && (
        <Modal closeModal={toggleModal}>
          <h2>
            CART <TiShoppingCart />
          </h2>
          {!cart.length ? (
            <p>no data</p>
          ) : (
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
          )}
        </Modal>
      )}
    </>
  );
};

export default Products;

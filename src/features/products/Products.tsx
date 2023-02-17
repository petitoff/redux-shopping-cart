import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Product, getProducts } from "../../app/api";
import { productsReceived } from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import styles from "./Products.module.css";

export function Products() {
  const products = useAppSelector((state) => state.products.products);

  const dispatch = useAppDispatch();

  const handleAddToCart = (id: string) => {
    dispatch(addToCart(id));
  };

  useEffect(() => {
    getProducts().then((products) => dispatch(productsReceived(products)));
  }, []);

  return (
    <main className="page">
      <ul className={styles.products}>
        {Object.values<Product>(products).map((product: Product) => (
          <li key={product.id}>
            <article className={styles.product}>
              <figure>
                <img src={product.imageURL} alt={product.imageAlt} />
                <figcaption className={styles.caption}>
                  {product.imageCredit}
                </figcaption>
              </figure>
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={() => handleAddToCart(product.id)}>
                  Add to Cart 🛒
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}

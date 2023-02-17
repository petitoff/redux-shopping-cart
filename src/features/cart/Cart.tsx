import React from "react";
import styles from "./Cart.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getTotalPrice, removeFromCart } from "./cartSlice";

export function Cart() {
  const products = useAppSelector((state) => state.products.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([id, quantity]) => (
            <tr>
              <td>{products[id].name}</td>
              <td>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={quantity}
                />
              </td>
              <td>${products[id].price}</td>
              <td>
                <button
                  onClick={() => handleRemoveFromCart(id)}
                  aria-label={`Remove ${products[id].name} from Shopping Cart`}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form>
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getMemoizedNumItems } from "./cartSlice";
import styles from "./CartLink.module.css";

export function CartLink() {
  const numItems = useAppSelector(getMemoizedNumItems);
  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>🛒&nbsp;&nbsp;{numItems ?? "Cart"}</span>
    </Link>
  );
}

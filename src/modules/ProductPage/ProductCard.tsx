import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { name, price, fullPrice, screen, capacity, ram, image, itemId, id } =
    product;
  const hasDiscount = price !== fullPrice;
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.some(item => item.id === id);

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(product);
    }
  };

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(id);

  return (
    <div className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.card__imageContainer}>
        <img src={image} alt={name} className={styles.card__image} />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.card__title}>
        {name}
      </Link>

      <div className={styles.card__priceBlock}>
        <span className={styles.card__price}>${price}</span>
        {hasDiscount && (
          <span className={styles.card__fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.card__divider} />

      <div className={styles.card__specs}>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>Screen</span>
          <span className={styles.card__specValue}>{screen}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>Capacity</span>
          <span className={styles.card__specValue}>{capacity}</span>
        </div>
        <div className={styles.card__specRow}>
          <span className={styles.card__specLabel}>RAM</span>
          <span className={styles.card__specValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.card__actions}>
        <button
          type="button"
          className={`${styles.card__btnCart} ${
            isInCart ? styles['card__btnCart--added'] : ''
          }`}
          onClick={handleCartClick}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={`${styles.card__btnFavorite} ${
            isFavorite ? styles['card__btnFavorite--active'] : ''
          }`}
          onClick={() => toggleFavorite(id)}
        >
          <img
            src={
              isFavorite ? '/img/icons/like-active.svg' : '/img/icons/like.svg'
            }
            alt="Like"
          />
        </button>
      </div>
    </div>
  );
};

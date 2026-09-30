//import styles from './ProductActions.module.scss';
import classNames from 'classnames';
import { Product } from '../../../../types/Product';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import styles from '../../ProductDetailsPage.module.scss';

type ProductActionsProps = {
  product: Product;
};

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = cart.some(item => item.id === product.id);

  const handleCartClick = () => {
    if (isInCart) {
      return removeFromCart(product.id);
    }

    addToCart(product);
  };

  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.includes(product.id);

  return (
    <div>
      {product.price < product.fullPrice ? (
        <>
          <p>${product.price}</p>
          <p>${product.fullPrice}</p>
        </>
      ) : (
        <p>${product.price}</p>
      )}

      <button
        type="button"
        className={classNames(styles.card__btnCart, {
          [styles['card__btnCart--added']]: isInCart,
        })}
        onClick={handleCartClick}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        className={classNames(styles.card__btnFavorite, {
          [styles['card__btnFavorite--active']]: isFavorite,
        })}
        onClick={() => toggleFavorite(product.id)}
      >
        <img
          src={
            isFavorite ? '/img/icons/like-active.svg' : '/img/icons/like.svg'
          }
          alt="Like"
        />
      </button>
    </div>
  );
};

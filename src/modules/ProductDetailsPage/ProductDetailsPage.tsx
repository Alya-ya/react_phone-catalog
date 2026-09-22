import styles from './ProductDetailsPage.module.scss';
import { useParams } from 'react-router-dom';
import productsData from '../../api/products.json';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const product = productsData.find(pr => pr.itemId === productId);

  return (
    <section className={styles.product_not_found}>
      {product ? (
        product.name
      ) : (
        <>
          <h1 className={styles.product_not_found__title}>
            Product was not found
          </h1>

          <img
            className={styles.product_not_found__img}
            src="/img/product-not-found.png"
            alt="Product was not found"
          />
        </>
      )}
    </section>
  );
};

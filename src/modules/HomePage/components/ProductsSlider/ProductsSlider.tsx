import { ProductCard } from '../../../ProductPage/ProductCard';
import { Product } from '../../../../types/Product';
import styles from './ProductsSlider.module.scss';
import { useState, useEffect } from 'react';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1200) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCards);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className={styles.product_slider}>
      <h2 className={styles.product_slider__title}>{title}</h2>

      <div className={styles.product_slider__buttons}>
        <button
          disabled={currentIndex === 0}
          type="button"
          className={styles.product_slider__button}
          onClick={handlePrev}
        >
          <img src="/img/icons/left.svg" alt="Left menu" />
        </button>

        <button
          disabled={currentIndex >= maxIndex}
          type="button"
          className={styles.product_slider__button}
          onClick={handleNext}
        >
          <img src="/img/icons/right.svg" alt="Right menu" />
        </button>
      </div>

      <div className={styles.product_slider__products}>
        <div
          className={styles.product_slider__track}
          style={{
            transform: `translateX(calc(-${currentIndex} * (var(--card-width, 272px) + var(--card-gap, 16px))))`,
          }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

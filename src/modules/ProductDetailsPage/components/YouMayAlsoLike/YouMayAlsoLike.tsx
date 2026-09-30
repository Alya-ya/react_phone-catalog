import { useState } from 'react';

import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../ProductPage';

type YouMayAlsoLikeProps = {
  products: Product[];
};

export const YouMayAlsoLike = ({ products }: YouMayAlsoLikeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 4;
  const scrollStep = 1;
  const maxIndex = Math.max(products.length - visibleCards, 0);

  const handleNext = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + scrollStep;

      if (nextIndex >= maxIndex) {
        return maxIndex;
      }

      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev - scrollStep;

      return Math.max(nextIndex, 0);
    });
  };

  return (
    <section>
      <div>
        <h2>You may also like</h2>

        <div>
          <button
            disabled={currentIndex === 0}
            type="button"
            onClick={handlePrev}
          >
            <img src="/img/icons/left.svg" alt="Previous" />
          </button>

          <button
            disabled={currentIndex >= maxIndex}
            type="button"
            onClick={handleNext}
          >
            <img src="/img/icons/right.svg" alt="Next" />
          </button>
        </div>
      </div>

      <div>
        {products
          .slice(currentIndex, currentIndex + visibleCards)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};

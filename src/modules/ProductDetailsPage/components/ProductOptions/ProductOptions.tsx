//import styles from './ProductOptions.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';

type ProductOptionsProps = {
  product: Product;
  productVariants: Product[];
  availableColors: string[];
  availableCapacity: string[];
};

export const ProductOptions = ({
  product,
  productVariants,
  availableColors,
  availableCapacity,
}: ProductOptionsProps) => {
  return (
    <div>
      <div>
        <p>Available colors</p>
        <p>ID: {product.id}</p>
      </div>

      <div>
        {availableColors.map(color => {
          const colorVariant = productVariants.find(
            variant => variant.color === color,
          );

          if (!colorVariant) {
            return null;
          }

          return (
            <Link key={color} to={`/product/${colorVariant.itemId}`}>
              {color}
            </Link>
          );
        })}
      </div>

      <div>
        <p>Select capacity</p>

        {availableCapacity.map(capacity => {
          const capacityVariant = productVariants.find(
            variant => variant.capacity === capacity,
          );

          if (!capacityVariant) {
            return null;
          }

          return (
            <Link key={capacity} to={`/product/${capacityVariant.itemId}`}>
              {capacity}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

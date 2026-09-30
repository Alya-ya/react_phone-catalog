import { Product } from '../../../../types/Product';

type ProductSpecsProps = {
  product: Product;
};

export const ProductSpecs = ({ product }: ProductSpecsProps) => {
  return (
    <div>
      <div>
        <div>
          <p>Screen</p>
          <p>{product.screen}</p>

          <p>Resolution</p>
          <p>{product.resolution}</p>

          <p>Processor</p>
          <p>{product.processor}</p>

          <p>RAM</p>
          <p>{product.ram}</p>
        </div>
      </div>
    </div>
  );
};

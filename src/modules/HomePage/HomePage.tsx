import React from 'react';
import styles from './HomePage.module.scss';

import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory/ShopByCategory';
import productsData from '../../api/products.json';
import { Product } from '../../types/Product';

export const HomePage: React.FC = () => {
  const products: Product[] = productsData;

  const newProducts = [...products].sort((a, b) => b.year - a.year);

  const hotPriceProducts = [...products]
    .filter(p => p.fullPrice && p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <main className={styles.homePage}>
      <h1 className="is-hidden">Product Catalog</h1>

      <section className={styles.homePage__section}>
        <PicturesSlider />
      </section>

      <section className={styles.homePage__section}>
        <ProductsSlider title="Brand new models" products={newProducts} />
      </section>

      <section className={styles.homePage__section}>
        <ShopByCategory />
      </section>

      <section className={styles.homePage__section}>
        <ProductsSlider title="Hot prices" products={hotPriceProducts} />
      </section>
    </main>
  );
};

import styles from './ProductDetailsPage.module.scss';
import { useEffect, useState } from 'react';
import productsData from '../../api/products.json';
import phonesData from '../../api/phones.json';
import tabletsData from '../../api/tablets.json';
import accessoriesData from '../../api/accessories.json';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductGallery } from './components/ProductGallery/ProductGallery';
import { ProductOptions } from './components/ProductOptions';
import { ProductActions } from './components/ProductActions';
import { ProductSpecs } from './components/ProductSpecs';
import { ProductAbout } from './components/ProductAbout';
import { TechSpecs } from './components/TechSpecs';
import { YouMayAlsoLike } from './components/YouMayAlsoLike';
import { Loader } from '../../components/Loader';

type ProductDetails = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
};

export const ProductDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const products = productsData as unknown as Product[];

  const allProductsDetails: ProductDetails[] = [
    ...phonesData,
    ...tabletsData,
    ...accessoriesData,
  ];

  const product = products.find(pr => pr.itemId === productId);

  if (!product) {
    return (
      <section className={styles.product_not_found}>
        <h1 className={styles.product_not_found__title}>
          Product was not found
        </h1>

        <img
          className={styles.product_not_found__img}
          src="/img/product-not-found.png"
          alt="Product was not found"
        />
      </section>
    );
  }

  const productDetails = allProductsDetails.find(
    item => item.id === product.itemId,
  );

  if (!productDetails) {
    return null;
  }

  const screen = productDetails.screen ?? product.screen;
  const resolution = productDetails.resolution ?? product.resolution;
  const processor = productDetails.processor ?? product.processor;

  const productWithDetails = {
    ...product,
    screen,
    resolution,
    processor,
  };

  const productModel = product.itemId.split('-').slice(0, -2).join('-');

  const productVariants = productModel
    ? products.filter(pr => pr.itemId.startsWith(`${productModel}-`))
    : [];

  const availableColors = productDetails.colorsAvailable;
  const availableCapacity = productDetails.capacityAvailable;

  const specs = [
    { title: 'Screen', value: productDetails.screen },
    { title: 'Resolution', value: productDetails.resolution },
    { title: 'Processor', value: productDetails.processor },
    { title: 'RAM', value: productDetails.ram },
    { title: 'Built in memory', value: productDetails.capacity },
    { title: 'Camera', value: productDetails.camera },
    { title: 'Zoom', value: productDetails.zoom },
    {
      title: 'Cell',
      value: productDetails.cell?.join(', '),
    },
  ].filter((spec): spec is { title: string; value: string } =>
    Boolean(spec.value),
  );

  const getSuggestedProducts = (
    allProducts: Product[],
    currentProductId: number,
  ) => {
    return allProducts
      .filter(item => item.id !== currentProductId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
  };

  const recommendedProducts = getSuggestedProducts(products, product.id);

  return (
    <section>
      <div>
        <div>
          <Link to="/">
            <img src="/img/icons/home.svg" alt="Home" />
          </Link>

          <img src="/img/icons/right.svg" alt="" />

          <Link to={`/${product.category}`}>{product.category}</Link>

          <img src="/img/icons/right.svg" alt="" />

          <p>{product.name}</p>
        </div>

        <div>
          <button type="button" onClick={() => navigate(-1)}>
            <img src="/img/icons/left.svg" alt="" />
          </button>

          <p>Back</p>
        </div>

        <ProductGallery image={product.image} name={product.name} />

        <div>
          <ProductOptions
            product={productWithDetails}
            productVariants={productVariants}
            availableColors={availableColors}
            availableCapacity={availableCapacity}
          />

          <ProductActions product={productWithDetails} />

          <ProductSpecs product={productWithDetails} />
        </div>

        <ProductAbout description={productDetails.description} />

        <TechSpecs specs={specs} />

        <YouMayAlsoLike products={recommendedProducts} />
      </div>
    </section>
  );
};

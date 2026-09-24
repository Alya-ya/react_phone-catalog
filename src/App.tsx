import './App.scss';
import { Routes, Route } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { ProductsPage } from './modules/ProductsPage';

export const App = () => (
  <CartProvider>
    <FavoritesProvider>
      <Header />

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<ProductsPage />} />

          <Route path="/tablets" element={<ProductsPage />} />

          <Route path="/accessories" element={<ProductsPage />} />

          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route
            path="/favorites"
            element={<h1 className="title">FavoritesPage</h1>}
          />

          <Route path="/cart" element={<h1 className="title">CartPage</h1>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
    </FavoritesProvider>
  </CartProvider>
);

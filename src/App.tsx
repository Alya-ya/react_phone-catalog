import './App.scss';
import { Routes, Route } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App = () => (
  <>
    <Header />

    <div>
      <Routes>
        <Route path="/" element={<h1 className="title">HomePage</h1>} />
        <Route
          path="/phones"
          element={<h1 className="title">ProductsPage</h1>}
        />
        <Route
          path="/tablets"
          element={<h1 className="title">ProductsPage</h1>}
        />
        <Route
          path="/accessories"
          element={<h1 className="title">ProductsPage</h1>}
        />
        <Route
          path="/product/:productId"
          element={<h1 className="title">ProductDetailsPage</h1>}
        />
        <Route
          path="/favorites"
          element={<h1 className="title">FavoritesPage</h1>}
        />
        <Route path="/cart" element={<h1 className="title">CartPage</h1>} />

        <Route path="*" element={<h1 className="title">NotFoundPage</h1>} />
      </Routes>
    </div>

    <Footer />
  </>
);

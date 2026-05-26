import { Routes, Route } from 'react-router-dom';
import Products from '../pages/Products/Products';
import About from '../pages/About/About';
import Contacts from '../pages/Contacts/Contacts';
import Cart from '../pages/Cart/Cart';
import AuthPage from '../pages/Auth/AuthPage';

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
    </Routes>
  );
}

export default AppRoutes;

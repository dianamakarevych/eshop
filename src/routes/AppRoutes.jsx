import { Routes, Route } from 'react-router-dom';
import Products from '../pages/Products/Products';
import About from '../pages/About/About';
import Contacts from '../pages/Contacts/Contacts';
import Cart from '../pages/Cart/Cart';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default AppRoutes;
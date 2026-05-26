import { Routes, Route, useLocation } from 'react-router-dom';
import Products from '../pages/Products/Products';
import About from '../pages/About/About';
import Contacts from '../pages/Contacts/Contacts';
import Cart from '../pages/Cart/Cart';
import Register from '../pages/Register/Register';

function AppRoutes(): JSX.Element {
  const location = useLocation();
  
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register key={location.pathname} />} />
      <Route path="/login" element={<Register key={location.pathname} />} />
    </Routes> 
  );
}

export default AppRoutes;
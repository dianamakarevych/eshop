import { useEffect } from 'react';
import Header from './components/common/Header/Header';
import Footer from './components/common/footer/Footer';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import { initializeStore } from './utils/initData';
import { CartProvider } from './context/CartContext'; 

function App() {
  useEffect(() => {
    initializeStore();
  }, []);
  
  return (
    <CartProvider> 
      <div className="App">
        <Header />
        
        <main className="mainContent">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
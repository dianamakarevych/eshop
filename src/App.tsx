import { useEffect } from 'react';
import Header from './components/common/Header/Header';
import Footer from './components/common/footer/Footer';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import { initializeStore } from './utils/initData';

function App() {
  useEffect(() => {
    initializeStore();
  }, []);
  
  return (
    <div className="App">
      <Header />
      
      <main className="mainContent">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
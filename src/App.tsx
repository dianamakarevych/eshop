import Header from './components/common/Header/Header';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
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
    </div>
  );
}

export default App;
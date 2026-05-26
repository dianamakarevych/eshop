import Header from './components/common/Header/Header';
import AppRoutes from './routes/AppRoutes';

function App() {
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
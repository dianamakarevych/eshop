import reactLogo from './assets/react.svg'
import Header from './components/common/Header/Header.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {

  return (
    <div className="App">
      <Header/>
      <main className="mainContent">
        <AppRoutes/>
      </main>
    </div>
  );
}

export default App;

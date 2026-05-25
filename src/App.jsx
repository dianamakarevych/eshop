import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header/Header.jsx'

function App() {
  const Home = () => <div style={{ padding: '20px' }}><h1>Hlavní strana (Home)</h1></div>;
  const Products = () => <div style={{ padding: '20px' }}><h1>Katalog produktů (Products)</h1></div>;
  const Contact = () => <div style={{ padding: '20px' }}><h1>Kontakty (Contact)</h1></div>;

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App

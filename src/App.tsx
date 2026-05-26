import Header from "./components/common/Header/Header";
import Footer from "./components/common/footer/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
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

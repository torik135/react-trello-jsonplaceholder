import "./App.css";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>

      <main>
        <MainLayout />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

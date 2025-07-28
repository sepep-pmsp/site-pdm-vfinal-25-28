import "./App.css";
import { HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./page/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Home />
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;

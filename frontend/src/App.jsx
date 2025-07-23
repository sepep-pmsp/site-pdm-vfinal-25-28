import "./App.css";
import { HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./page/Home/Home";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Home />
      </HashRouter>
    </div>
  );
}

export default App;

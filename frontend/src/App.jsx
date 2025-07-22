import "./App.css";
import { HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        {/* Your routes and components will go here */}
      </HashRouter>
    </div>
  );
}

export default App;

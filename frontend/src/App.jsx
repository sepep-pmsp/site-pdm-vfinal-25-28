import "./App.css";
import { HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TestApiGet from "./api/api";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        {/* Your routes and components will go here */}
        <TestApiGet />
      </HashRouter>
    </div>
  );
}

export default App;

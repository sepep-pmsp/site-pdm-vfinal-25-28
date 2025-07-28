import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div>
      <>
        <Navbar />
        <AppRoutes />
        <Footer />
      </>
    </div>
  );
}

export default App;

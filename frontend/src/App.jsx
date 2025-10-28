import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import CookiesBanner from "./content/CookiesBanner";
import { useEffect } from "react";
import { enhanceAccessibility, enhanceTextSemantics } from "./utils/accessibilityEnhancer";
import VLibras from "./components/VLibras/VLibras";

function App() {
    useEffect(() => {
        enhanceAccessibility();
        enhanceTextSemantics(document);
    }, []);
    return (
        <div>
            <>
                <Navbar />
                <CookiesBanner />
                <AppRoutes />
                <VLibras requireCookieConsent={false} />
                <Footer />
            </>
        </div>
    );
}

export default App;

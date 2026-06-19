import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { enhanceAccessibility, enhanceTextSemantics } from "./shared/utils/accessibilityEnhancer";
import CookiesBanner from "@/shared/components/feedback/CookiesBanner";
import VLibras from "@/shared/components/ui/VLibras";
import Navbar from "@/shared/components/layout/Navbar/Navbar";
import Footer from "@/shared/components/layout/Footer/Footer";
import ScrollToTop from "./shared/components/ui/ScrollToTop";

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
                <ScrollToTop />
                <AppRoutes />
                <VLibras requireCookieConsent={false} />
                <Footer />
            </>
        </div>
    );
}

export default App;

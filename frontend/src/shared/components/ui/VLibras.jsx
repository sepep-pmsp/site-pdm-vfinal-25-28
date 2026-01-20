import React, { useEffect } from "react";

const VLIBRAS_SCRIPT_SRC = "https://vlibras.gov.br/app/vlibras-plugin.js";
const VLIBRAS_APP_URL = "https://vlibras.gov.br/app";

export default function VLibras({ enabled = true, requireCookieConsent = true }) {
    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") return;

        if (requireCookieConsent) {
            const accepted = localStorage.getItem("cookiesAccepted");
            if (!accepted) return; 
        }
        if (document.getElementById("vlibras-script")) {
            if (window.VLibras && !window.__vlibrasWidgetInitialized) {
                try {
                    window.__vlibrasWidget = new window.VLibras.Widget(VLIBRAS_APP_URL);
                    window.__vlibrasWidgetInitialized = true;
                } catch (e) {
                    console.warn("VLibras init falhou:", e);
                }
            }
            return;
        }
        const wrapper = document.createElement("div");
        wrapper.className = "vw-wrapper";
        wrapper.innerHTML = `
            <div vw class="enabled vLibras-mobile">
                <div vw-access-button class="active"></div>
                <div vw-plugin-wrapper>
                <div class="vw-plugin-top-wrapper"></div>
                </div>
            </div>
        `;
        document.body.appendChild(wrapper);

        const script = document.createElement("script");
        script.id = "vlibras-script";
        script.src = VLIBRAS_SCRIPT_SRC;
        script.defer = true;
        script.crossOrigin = "anonymous";
        script.onload = () => {
            try {
                if (window.VLibras && !window.__vlibrasWidgetInitialized) {
                    window.__vlibrasWidget = new window.VLibras.Widget(VLIBRAS_APP_URL);
                    window.__vlibrasWidgetInitialized = true;
                }
            } catch (e) {
                console.warn("Erro ao iniciar VLibras:", e);
            }
        };
        script.onerror = (e) => {
            console.error("Falha ao carregar script VLibras:", e);
        };
        document.head.appendChild(script);

        return () => {
            try {
                wrapper.remove();
                const s = document.getElementById("vlibras-script");
                if (s) {
                    // opcional: não remover para permitir reaproveitamento em SPA
                    // s.remove();
                }
                if (window.__vlibrasWidget && typeof window.__vlibrasWidget.disable === "function") {
                    try { window.__vlibrasWidget.disable(); } catch { /* ignore */ }
                    try { delete window.__vlibrasWidget; } catch { /* ignore */ }
                    window.__vlibrasWidgetInitialized = false;
                }
                // eslint-disable-next-line no-unused-vars
            } catch (e) { /* ignore */ }
        };
    }, [enabled, requireCookieConsent]);

    return null;
}

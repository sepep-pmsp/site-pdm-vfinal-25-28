// src/components/CookiesBanner.jsx
import React, { useEffect, useState } from "react";
import cookiesInfo from "./cookies";

export default function CookiesBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [content, setContent] = useState(null);

    useEffect(() => {
        const accepted = localStorage.getItem("cookiesAccepted");
        setShowBanner(!accepted);

        if (!accepted) {
            setContent(cookiesInfo[0] || null);
        }
    }, []);

    function acceptCookies() {
        localStorage.setItem("cookiesAccepted", "true");
        setShowBanner(false);
    }

    if (!showBanner || !content) return null;

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Aviso de cookies"
            className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 bg-[var(--color-blue-dark)] shadow-lg rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 z-50"
            style={{ maxWidth: 980, margin: "0 auto" }}
        >
            <div className="flex-1">
                <h2 className="font-semibold text-white mb-1 text-2xl">{content.title}</h2>
                <p className="text-sm text-start text-white mt-8 xl:w-2xl">{content.description}</p>
            </div>

            <div className="flex items-center gap-3">
                <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline text-white"
                >
                    {content.name_link}
                </a>

                <button
                    onClick={acceptCookies}
                    className="px-4 py-2 rounded-md border border-gray-300 bg-[var(--color-cyan-dark)] text-white font-medium"
                >
                    {content.name_button}
                </button>
            </div>
        </div>
    );
}

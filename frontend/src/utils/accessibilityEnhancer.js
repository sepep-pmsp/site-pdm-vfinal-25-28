// src/utils/accessibilityEnhancer.js
// Funções para aplicar melhorias automáticas de acessibilidade no DOM.
// IMPORTANTE: roda no cliente (browser). Teste em homolog antes de PROD.

export function enhanceAccessibility(root = document, options = {}) {
  const doc = root instanceof Document ? root : root.ownerDocument || document;
  const cfg = {
    lang: options.lang || "pt-BR",
    focusStyleId: options.focusStyleId || "__a11y-focus-styles",
    liveRegionId: options.liveRegionId || "global-live-region",
  };

  try {
    // 1) definir lang no <html> se não definido
    if (!doc.documentElement.getAttribute("lang")) {
      doc.documentElement.setAttribute("lang", cfg.lang);
    }

    // 2) injetar estilos de foco visível (evita duplicados)
    if (!doc.getElementById(cfg.focusStyleId)) {
      const style = doc.createElement("style");
      style.id = cfg.focusStyleId;
      style.textContent = `
/* acessibilidade: foco visível consistente */
:focus {
  outline: 3px solid #005fcc !important;
  outline-offset: 2px !important;
}
a:focus, button:focus, input:focus, textarea:focus, select:focus {
  outline: 3px solid #005fcc !important;
  outline-offset: 2px !important;
}
/* classe para labels visuais escondidas */
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0 0 0 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
`;
      doc.head.appendChild(style);
    }

    // 3) criar região aria-live global para anúncios (se não existir)
    if (!doc.getElementById(cfg.liveRegionId)) {
      const live = doc.createElement("div");
      live.id = cfg.liveRegionId;
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      live.setAttribute("aria-atomic", "true");
      Object.assign(live.style, {
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
      });
      doc.body.appendChild(live);

      // helper global para anunciar mensagens
      if (typeof window !== "undefined") {
        window.__a11yAnnounce = (msg) => {
          try {
            live.textContent = "";
            setTimeout(() => (live.textContent = msg), 50);
          // eslint-disable-next-line no-unused-vars
          } catch (e) {
            /* ignore */
          }
        };
      }
    }

    // 4) adicionar skip link se não existe
    if (!doc.getElementById("__a11y-skiplink")) {
      const skip = doc.createElement("a");
      skip.href = "#__a11y-main";
      skip.id = "__a11y-skiplink";
      skip.textContent = "Ir para o conteúdo (pressione Enter)";
      skip.className = "sr-only";
      // estilos mínimos (mostra quando focado)
      Object.assign(skip.style, {
        position: "absolute",
        top: "0",
        left: "0",
        padding: "8px",
        background: "white",
        zIndex: "9999",
        color: "black",
      });
      skip.addEventListener("focus", () => skip.classList.remove("sr-only"));
      skip.addEventListener("blur", () => skip.classList.add("sr-only"));
      doc.body.insertBefore(skip, doc.body.firstChild);
    }

    console.info("✅ Acessibilidade base aplicada");
    if (typeof window !== "undefined" && window.__a11yAnnounce) {
      window.__a11yAnnounce("Melhorias de acessibilidade aplicadas.");
    }
    return { ok: true };
  } catch (err) {
    console.error("Erro ao aplicar enhanceAccessibility:", err);
    return { error: err };
  }
}

// -----------------------------
// Função para normalizar headings
// -----------------------------
export function enhanceTextSemantics(root = document, options = {}) {
  const doc = root instanceof Document ? root : root.ownerDocument || document;
  const cfg = {
    minFontScaleForHeading: options.minFontScaleForHeading ?? 1.15,
    boldWeightThreshold: options.boldWeightThreshold ?? 600,
    maxCandidates: options.maxCandidates ?? 400,
    debug: options.debug ?? false,
  };

  function log(...args) {
    if (cfg.debug) console.info("[a11y-text-semantics]", ...args);
  }

  try {
    const bodyStyle = window.getComputedStyle(doc.body);
    const baseSize = parseFloat(bodyStyle.fontSize) || 16;

    const nativeHeadings = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((el) => ({
      el,
      type: "native",
      tagLevel: parseInt(el.tagName[1], 10),
      computed: window.getComputedStyle(el),
    }));

    const textCandidates = [];
    const possible = Array.from(doc.querySelectorAll("div, span, p, strong, em, b")).slice(0, cfg.maxCandidates);
    possible.forEach((el) => {
      const text = (el.textContent || "").trim();
      if (!text || text.length < 2) return;
      const cs = window.getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      const fontSize = parseFloat(cs.fontSize || baseSize);
      const fontWeight = parseInt(cs.fontWeight) || (cs.fontWeight === "bold" ? 700 : 400);
      if (fontSize >= baseSize * cfg.minFontScaleForHeading || fontWeight >= cfg.boldWeightThreshold) {
        textCandidates.push({ el, type: "visual", fontSize, fontWeight, computed: cs });
      }
    });

    const allCandidates = [
      ...nativeHeadings.map((c) => ({ ...c, isNative: true })),
      ...textCandidates.map((c) => ({ ...c, isNative: false })),
    ];
    allCandidates.sort((a, b) => {
      if (a.el === b.el) return 0;
      const pos = a.el.compareDocumentPosition(b.el);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
      return 0;
    });

    if (allCandidates.length === 0) {
      log("Nenhum candidato a heading encontrado.");
      return { applied: 0 };
    }

    const hasNativeH1 = nativeHeadings.some((h) => h.tagLevel === 1);
    const hasAriaH1 = !!doc.querySelector('[role="heading"][aria-level="1"]');

    let prevLevel = null;
    let applied = 0;
    for (let i = 0; i < allCandidates.length; i++) {
      const cand = allCandidates[i];
      const el = cand.el;
      let preferredLevel = 2;
      if (cand.isNative) {
        preferredLevel = cand.tagLevel || 2;
      } else {
        const fs = cand.fontSize || baseSize;
        const ratio = fs / baseSize;
        if (ratio >= 2.0) preferredLevel = 1;
        else if (ratio >= 1.6) preferredLevel = 2;
        else if (ratio >= 1.3) preferredLevel = 3;
        else preferredLevel = 4;
      }

      if (!hasNativeH1 && !hasAriaH1 && prevLevel === null) preferredLevel = 1;
      if (prevLevel !== null && preferredLevel > prevLevel + 1) preferredLevel = prevLevel + 1;
      preferredLevel = Math.max(1, Math.min(6, preferredLevel));

      try {
        if (cand.isNative) {
          if (preferredLevel !== cand.tagLevel) {
            el.setAttribute("aria-level", String(preferredLevel));
            applied++;
            log(`Ajustado aria-level em ${el.tagName} -> ${preferredLevel}`);
          } else {
            if (!el.hasAttribute("role")) el.setAttribute("role", "heading");
          }
        } else {
          if (!el.hasAttribute("role") || el.getAttribute("role") !== "heading") {
            el.setAttribute("role", "heading");
          }
          el.setAttribute("aria-level", String(preferredLevel));
          applied++;
          log(`Marcou elemento <${el.tagName.toLowerCase()}> como heading nivel ${preferredLevel}`);
        }
      } catch (err) {
        console.warn("Não foi possível aplicar role/aria-level em elemento:", el, err);
      }

      prevLevel = preferredLevel;
    }

    if (window.__a11yAnnounce) {
      window.__a11yAnnounce(`Hierarquia de títulos ajustada. ${applied} alterações aplicadas.`);
    }
    console.info("%cA11Y Text Semantics:", "font-weight:bold;color:teal", `Alterações aplicadas: ${applied}`);
    return { applied, candidates: allCandidates.length };
  } catch (err) {
    console.error("Erro em enhanceTextSemantics:", err);
    return { error: err };
  }
}

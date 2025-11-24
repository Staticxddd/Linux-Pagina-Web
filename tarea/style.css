(async () => {
  // 1) Datos de páginas
  const S = "https://prod.spline.design/GI4C-E-MV0RERVEJ/scene.splinecode";
  const pages = [
    { letter: "A", title: "Alert 911", desc: "Llama a emergencias.", icon: "emergency_share", spline: S },
    { letter: "B", title: "Bleeding: señales", desc: "Detecta sangrado grave.", icon: "bloodtype", spline: S },
    { letter: "C", title: "Compress: presión", desc: "Aplica presión directa.", icon: "pan_tool_alt", spline: S },
    { letter: "A", title: "Ubicación", desc: "Indica dónde estás.", icon: "my_location", spline: S },
    { letter: "B", title: "Hemorragias A/B/C", desc: "Extremidad, torácica, abdominal.", icon: "monitor_heart", spline: S },
    { letter: "C", title: "Empaquetado", desc: "Relleno de la herida (gauze).", icon: "inventory_2", spline: S },
    { letter: "C", title: "Torniquete", desc: "Cuándo y cómo usarlo.", icon: "watch", spline: S },
    { letter: "B", title: "Puntos de presión", desc: "Compresión proximal.", icon: "gesture", spline: S },
    { letter: "A", title: "Escena segura", desc: "Evalúa riesgos primero.", icon: "warning", spline: S },
    { letter: "A", title: "Pedir ayuda", desc: "Coordina a más personas.", icon: "group", spline: S },
    { letter: "B", title: "Re-evaluación", desc: "Comprueba si cesa el sangrado.", icon: "loop", spline: S },
    { letter: "C", title: "Vendaje", desc: "Fijar la compresión.", icon: "stacks", spline: S },
    { letter: "B", title: "Shock", desc: "Reconocer signos de shock.", icon: "density_small", spline: S },
    { letter: "A", title: "Traslado", desc: "Prioriza el transporte.", icon: "local_hospital", spline: S },
    { letter: "C", title: "Resumen", desc: "Repaso A-B-C completo.", icon: "check_circle", spline: S },
  ];

  // 2) Hooks del DOM
  const viewer = document.querySelector(".spline-box spline-viewer");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const countEl = document.getElementById("count");
  const totalEl = document.getElementById("total");
  const cards   = Array.from(document.querySelectorAll(".cards .card"));
  const box     = document.querySelector(".spline-box");

  // 3) CSS para loader y animaciones
  const injectStyles = () => {
    const css = `
      .spline-box{ position:relative; }
      .spline-loader{
        position:absolute; inset:0; display:none; place-items:center;
        font:600 13px/1 system-ui,-apple-system,Segoe UI,Roboto;
        background:linear-gradient(180deg, rgba(11,18,32,.85), rgba(11,18,32,.6));
        backdrop-filter: blur(4px) saturate(130%);
        color:#e8edff;
      }
      .spline-loader.show{ display:grid; }
      .cards .card{
        transition: background-color 0.4s ease, color 0.4s ease, transform 0.3s ease;
      }
      .cards .card.is-active{
        transform: scale(1.03);
        color:#fff;
      }
      .toolbar .btn[disabled]{ opacity:.5; pointer-events:none; }
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  };
  injectStyles();

  // 4) Loader
  const loader = document.createElement("div");
  loader.className = "spline-loader";
  loader.textContent = "Cargando escena…";
  box.appendChild(loader);
  const showLoader = () => loader.classList.add("show");
  const hideLoader = () => loader.classList.remove("show");

  // 5) Estado/paginado
  let idx = 0;
  let lastIdx = -1;

  const pad2 = (n) => String(n).padStart(2, "0");
  const setButtonsState = () => {
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === pages.length - 1;
  };

  // 🎨 Colores personalizados
  const colorFuerte = "#d84315"; // naranja fuerte
  const colorSuave = "#ffab91";  // naranja suave

  // 🔄 Cambia el color del card actual y suaviza el anterior
  const highlightCards = () => {
    const letter = pages[idx].letter;
    cards.forEach((card, i) => {
      const active = card.dataset.letter === letter;
      card.classList.toggle("is-active", active);

      if (active) {
        card.style.backgroundColor = colorFuerte;
        card.style.color = "#fff";
      } else if (lastIdx >= 0 && pages[lastIdx].letter === card.dataset.letter) {
        // el elemento anterior se pone suave
        card.style.backgroundColor = colorSuave;
        card.style.color = "#111";
      } else {
        // los demás vuelven a su color base
        card.style.backgroundColor = "";
        card.style.color = "";
      }
    });
  };

  const setSpline = (url) => {
    if (!viewer) return;
    showLoader();
    const onLoaded = () => {
      viewer.removeEventListener("load", onLoaded);
      hideLoader();
    };
    viewer.addEventListener("load", onLoaded, { once: true });
    viewer.setAttribute("url", url);
  };

  const render = () => {
    countEl.textContent = pad2(idx + 1);
    totalEl.textContent = pad2(pages.length);
    setButtonsState();
    highlightCards();
    setSpline(pages[idx].spline);
  };

  // 6) Navegación
  prevBtn.addEventListener("click", () => {
    if (idx > 0) {
      lastIdx = idx;
      idx--;
      render();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (idx < pages.length - 1) {
      lastIdx = idx;
      idx++;
      render();
    }
  });

  // Flechas de teclado
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });

  // Clic en tarjeta
  const firstIndexOf = (letter) => pages.findIndex(p => p.letter === letter);
  cards.forEach(card => {
    card.addEventListener("click", () => {
      lastIdx = idx;
      const j = firstIndexOf(card.dataset.letter);
      if (j !== -1) { idx = j; render(); }
    });
  });

  // 7) Espera a que el custom element esté listo antes del primer render
  if (window.customElements && customElements.whenDefined) {
    await customElements.whenDefined("spline-viewer");
  }
  render();
})();
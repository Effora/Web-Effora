import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "ficha");

const shell = (title, desc, body) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Proyectos Effora</title>
  <meta name="description" content="${desc}">
  <meta name="theme-color" content="#1A1F26">
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">
  <link rel="preload" href="../assets/effora-logo-sm.png" as="image" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <noscript><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"></noscript>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Saltar al contenido</a>
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a class="brand" href="../index.html">
        <img class="brand-logo" src="../assets/effora-logo-sm.png" alt="" width="52" height="52" decoding="async">
        <span class="brand-text">
          <span class="brand-word">EFFORA</span>
          <span class="brand-tagline">Empresa de Software</span>
        </span>
      </a>
      <nav class="nav" aria-label="Principal">
        <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-menu" id="nav-menu">
          <li><a href="/proyectos/" aria-current="page">Proyectos</a></li>
          <li><a href="/#servicios">Servicios</a></li>
          <li><a href="/sistema-ia">Sistema IA</a></li>
          <li><a href="https://wa.me/5492236910803?text=Hola%20EFFORA%2C%20quiero%20consultar%20por%20un%20proyecto." class="nav-cta" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main id="main" class="project-page">
    <div class="container">
      <p class="project-back"><a href="/proyectos/">← Todos los proyectos</a></p>
${body}
    </div>
  </main>
  <a class="contact-dock-wa" href="https://wa.me/5492236910803?text=Hola%20EFFORA%2C%20quiero%20consultar%20por%20un%20proyecto." target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp">
    <span class="contact-dock-wa__bubble" aria-hidden="true">Contactanos</span>
    <span class="contact-dock-wa__btn">
      <img class="contact-dock-wa__logo" src="../assets/effora-logo-sm.png" alt="" width="52" height="52" decoding="async">
    </span>
  </a>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <img class="brand-logo" src="../assets/effora-logo-sm.png" alt="" width="52" height="52" decoding="async">
        <span class="brand-text">
          <span class="brand-word">EFFORA</span>
          <span class="brand-tagline">Empresa de Software</span>
        </span>
      </div>
      <p class="footer-tag mono-label">Efficiency · Forward</p>
      <nav class="footer-nav" aria-label="Pie">
        <a href="/proyectos/">Proyectos</a>
        <a href="/#servicios">Servicios</a>
        <a href="/sistema-ia">Sistema IA del Agente</a>
        <a href="/#contacto">Contacto</a>
      </nav>
      <p class="footer-legal">© <span id="year"></span> Effora Empresa de Software · <a href="mailto:gestion@effora.com.ar">gestion@effora.com.ar</a></p>
    </div>
  </footer>
  <script src="../js/main.js"></script>
</body>
</html>`;

const pages = [
  {
    file: "crm-inmobiliario.html",
    title: "CRM inmobiliario",
    desc: "CRM inmobiliario con seguimiento de contactos, links enviados y sincronización con Google Calendar.",
    body: `      <article class="project-detail project-detail--solo" id="crm-inmobiliario">
        <header class="project-detail-head">
          <span class="project-tag">CRM · Inmobiliario · Seguimiento</span>
          <h1>CRM inmobiliario</h1>
          <p class="project-detail-lead">
            Módulo CRM para inmobiliarias: seguimiento de contactos con perfiles múltiples,
            links enviados organizados por fecha, acceso directo a WhatsApp y Gmail, y
            sincronización con Google Calendar para actividades, visitas y recordatorios.
          </p>
        </header>
        <div class="project-detail-gallery project-detail-gallery--duo">
          <figure class="project-shot">
            <img src="../assets/projects/crm-seguimiento.jpg" alt="Ficha de contacto CRM con perfiles múltiples vendedor y comprador." width="960" height="548" loading="lazy" decoding="async">
            <figcaption class="project-shot-caption">Seguimiento de contactos</figcaption>
          </figure>
          <figure class="project-shot">
            <img src="../assets/projects/crm-links.jpg" alt="CRM con links enviados registrados por fecha para seguimiento comercial." width="960" height="523" loading="lazy" decoding="async">
            <figcaption class="project-shot-caption">Links enviados por fecha</figcaption>
          </figure>
        </div>
        <figure class="project-shot">
          <img src="../assets/projects/crm-calendario.jpg" alt="Landing del módulo CRM con sincronización con Google Calendar para visitas y recordatorios." width="960" height="675" loading="lazy" decoding="async">
          <figcaption class="project-shot-caption">Sincronización con Google Calendar</figcaption>
        </figure>
        <div class="project-detail-body">
          <ul class="project-detail-features">
            <li>Perfiles múltiples sin duplicar fichas (vendedor y comprador en una sola)</li>
            <li>Seguimiento de links enviados con fecha, devolución y notas internas</li>
            <li>WhatsApp, Gmail y Google Calendar integrados desde la ficha del contacto</li>
            <li>Vinculación con operaciones y filtros por etapa comercial</li>
          </ul>
          <p class="project-detail-status"><span class="mono-label">Estado</span> En producción</p>
          <div class="project-detail-actions">
            <a href="https://registrodeoperacionesinmobiliarias.com" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Ver plataforma</a>
            <a href="https://registrodeoperacionesinmobiliarias.com/landing/crm.html" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">Ver landing CRM</a>
          </div>
        </div>
      </article>`,
  },
  {
    file: "dashboard.html",
    title: "Panel operativo",
    desc: "Dashboard operativo con Tailwind CSS, métricas en vivo y componentes reutilizables.",
    body: `      <article class="project-detail project-detail--solo" id="dashboard">
        <header class="project-detail-head">
          <span class="project-tag">Dashboard · Tailwind CSS</span>
          <h1>Panel operativo</h1>
          <p class="project-detail-lead">
            Dashboard administrativo con métricas en vivo, tarjetas de resumen y acciones
            rápidas. Construido con Tailwind CSS para mantener consistencia visual y
            velocidad de iteración.
          </p>
        </header>
        <figure class="project-shot">
          <img src="../assets/projects/dashboard-tailwind.jpg" alt="Dashboard operativo con gráficos y métricas construido en Tailwind CSS." width="960" height="600" loading="lazy" decoding="async">
        </figure>
        <div class="project-detail-body">
          <ul class="project-detail-features">
            <li>KPIs configurables por rol de usuario</li>
            <li>Gráficos y tablas responsive</li>
            <li>Componentes reutilizables para escalar el producto</li>
          </ul>
          <p class="project-detail-status"><span class="mono-label">Estado</span> Demo funcional</p>
        </div>
      </article>`,
  },
  {
    file: "oube.html",
    title: "Oube",
    desc: "Sistema de gestión interna Oube con landing comercial para bandas modulares industriales.",
    body: `      <article class="project-detail project-detail--solo" id="oube">
        <header class="project-detail-head">
          <span class="project-tag">Gestión interna · Oube</span>
          <h1>Oube</h1>
          <p class="project-detail-lead">
            Sistema de gestión interna con todo lo que contiene la operación: panel
            administrativo, inventario, pedidos, seguimiento y herramientas de backoffice.
            Incluye además la landing pública del producto. Una plataforma integral, no
            un parche sobre planillas.
          </p>
        </header>
        <div class="project-detail-gallery project-detail-gallery--duo">
          <figure class="project-shot">
            <img src="../assets/projects/oube-sistema-new.jpg" alt="Pantalla de acceso de OUBE Gestión con logo, usuario y contraseña." width="960" height="675" loading="lazy" decoding="async">
            <figcaption class="project-shot-caption">Sistema de gestión interna</figcaption>
          </figure>
          <figure class="project-shot">
            <img src="../assets/projects/oube-landing-new.jpg" alt="Landing pública de Oube con presentación del producto." width="960" height="600" loading="lazy" decoding="async">
            <figcaption class="project-shot-caption">Landing comercial incluida</figcaption>
          </figure>
        </div>
        <div class="project-detail-body">
          <ul class="project-detail-features">
            <li>Panel administrativo con roles y permisos</li>
            <li>Gestión de inventario, pedidos y operación diaria</li>
            <li>Landing pública integrada al ecosistema del producto</li>
          </ul>
          <p class="project-detail-status"><span class="mono-label">Estado</span> En desarrollo activo</p>
          <div class="project-detail-actions">
            <a href="https://oubebandamodular.com/landing/" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Ver landing</a>
          </div>
        </div>
      </article>`,
  },
  {
    file: "melioubi-latam.html",
    title: "Sitio Web Melioubi Latam",
    desc: "Sitio web para artista de rock con hero inmersivo, SEO y schema.org.",
    body: `      <article class="project-detail project-detail--solo" id="melioubi-latam">
        <header class="project-detail-head">
          <span class="project-tag">Sitio web · Melioubi Latam</span>
          <h1>Melioubi Latam WebSite</h1>
          <p class="project-detail-lead">
            Sitio oficial para Alejandro Mallo, guitarrista de rock internacional y
            referente de Entre Dos Tierras. Hero con imagen de escenario, secciones de
            trayectoria y banda, carrusel de Instagram y próximos conciertos. HTML, CSS y
            JavaScript vanilla con foco en SEO y accesibilidad.
          </p>
        </header>
        <div class="project-detail-gallery project-detail-gallery--duo">
          <figure class="project-shot">
            <img src="../assets/projects/melioubi-latam-home.jpg" alt="Hero del sitio Melioubi Latam con guitarrista en escenario y llamada a conciertos." width="960" height="600" loading="lazy" decoding="async">
            <figcaption class="project-shot-caption">Landing con hero y embed social</figcaption>
          </figure>
          <figure class="project-shot">
            <img src="../assets/projects/melioubi-latam-artist.jpg" alt="Alejandro Mallo tocando guitarra Fender en escenario en vivo." width="960" height="540" loading="lazy" decoding="async">
            <figcaption class="project-shot-caption">Imagen principal del artista</figcaption>
          </figure>
        </div>
        <div class="project-detail-body">
          <ul class="project-detail-features">
            <li>Hero inmersivo con video de Instagram integrado</li>
            <li>Secciones de trayectoria, banda y próximos shows</li>
            <li>Schema.org (Person, MusicGroup, MusicEvent) y meta SEO</li>
            <li>Diseño responsive mobile-first con tipografía temática rock</li>
          </ul>
          <p class="project-detail-status"><span class="mono-label">Estado</span> En producción</p>
        </div>
      </article>`,
  },
  {
    file: "nexova.html",
    title: "Formulario de postulación",
    desc: "Formulario de reclutamiento accesible con validación y campos condicionales.",
    body: `      <article class="project-detail project-detail--solo" id="nexova">
        <header class="project-detail-head">
          <span class="project-tag">Reclutamiento · RR.HH.</span>
          <h1>Formulario de postulación</h1>
          <p class="project-detail-lead">
            Formulario de captación de candidatos desarrollado para una empresa, con
            validación accesible, campos condicionales según el puesto y flujo pensado
            para el equipo de RR.HH.
          </p>
        </header>
        <figure class="project-shot">
          <img src="../assets/projects/nexova-formulario.jpg" alt="Formulario de postulación con campos de reclutamiento y validación accesible." width="960" height="675" loading="lazy" decoding="async">
        </figure>
        <div class="project-detail-body">
          <ul class="project-detail-features">
            <li>Formulario multi-paso con validación nativa</li>
            <li>Campos dinámicos según tipo de vacante</li>
            <li>Experiencia clara para candidatos y revisión interna</li>
          </ul>
          <p class="project-detail-status"><span class="mono-label">Estado</span> Demo funcional</p>
        </div>
      </article>`,
  },
  {
    file: "sistema-ia.html",
    title: "Sistema IA del Agente",
    desc: "Producto Effora con 100 prompts y plantillas operativas para asesores inmobiliarios.",
    body: `      <article class="project-detail project-detail--solo project-detail--highlight" id="sistema-ia">
        <header class="project-detail-head">
          <span class="project-tag">Producto · Disponible</span>
          <h1>Sistema IA del Agente</h1>
          <p class="project-detail-lead">
            Nuestro primer producto público para asesores inmobiliarios. 100 prompts con
            criterio del rubro, plantillas operativas y bonus de marketing. Acceso
            inmediato después del pago en Hotmart.
          </p>
        </header>
        <figure class="project-shot">
          <img src="../assets/projects/sistema-ia.jpg" alt="Landing del Sistema IA del Agente con propuesta de valor y módulos del producto." width="960" height="600" loading="lazy" decoding="async">
        </figure>
        <div class="project-detail-body">
          <ul class="project-detail-features">
            <li>Módulos: captación, venta, marketing y operaciones</li>
            <li>Plantillas para WhatsApp, email e Instagram</li>
            <li>Calendario de marketing editable incluido</li>
          </ul>
          <div class="project-detail-actions">
            <a href="/sistema-ia" class="btn btn-primary">Ver landing del producto</a>
            <a href="https://pay.hotmart.com/V105896752E" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">Comprar ahora</a>
          </div>
        </div>
      </article>`,
  },
];

for (const page of pages) {
  const html = shell(page.title, page.desc, page.body);
  fs.writeFileSync(path.join(outDir, page.file), html, "utf8");
  console.log("OK", page.file);
}

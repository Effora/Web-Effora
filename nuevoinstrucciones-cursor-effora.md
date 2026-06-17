# Instrucciones base para Cursor — Estándar de proyectos web (Effora)

> Pegá este bloque al inicio de cada proyecto que le solicites a Cursor (o copialo desde la vista previa).
>
> **Stack:** HTML + CSS + JS vanilla · Frontend en Cloudflare Pages · Backend en Render · Repos en github.com/Effora
>
> **Alcance:** HTML · CSS · Accesibilidad · SEO/GEO · Arquitectura de diseño · Componentes. Para JS, backend, DB y seguridad ver el archivo complementario full-stack.

---

## 0. Regla general — leer antes de escribir cualquier línea

- Separá siempre las **tres capas**: contenido (HTML) · presentación (CSS) · comportamiento (JS). Nunca las mezcles.
- **Todo proyecto se diseña primero para móvil y después se adapta a pantallas más grandes.** Mobile-First no es opcional.
- Priorizá mantenibilidad y reutilización por encima de la solución rápida.
- Usá etiquetas y técnicas modernas. Nada de hacks heredados.
- La **accesibilidad es obligatoria** desde el primer commit, no un paso final.

---

## 1. Estructura del proyecto

- CSS siempre en **archivos externos** enlazados con `<link rel="stylesheet" href="...">` en el `<head>`. Nunca inline ni `<style>` en producción.
- Si el CSS crece, dividilo en módulos: `base.css`, `header.css`, `formularios.css`, `tarjetas.css`.
- Estructura de carpetas mínima:
  ```
  /css
  /js
  /assets
  /img
  index.html
  ```

---

## 2. HTML: estructura y semántica correcta

### 2.1 Base obligatoria de toda página
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>...</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>...</header>
  <nav>...</nav>
  <main>...</main>
  <footer>...</footer>
</body>
</html>
```

### 2.2 Etiquetas semánticas — usá la correcta para cada cosa

| Etiqueta | Cuándo usarla |
|---|---|
| `<header>` | Cabecera de la página o de una sección |
| `<nav>` | Menú de navegación principal o secundario |
| `<main>` | Contenido principal de la página (uno por página) |
| `<section>` | Sección temática con su propio encabezado |
| `<article>` | Contenido autónomo (post, tarjeta, noticia) |
| `<aside>` | Contenido complementario, barra lateral |
| `<footer>` | Pie de página o de sección |
| `<figure>` + `<figcaption>` | Imágenes con descripción |
| `<button>` | Acciones. Nunca uses `<div>` ni `<span>` como botón |
| `<a>` | Navegación a otra URL. No lo uses para acciones |

**Regla:** si existe la etiqueta semántica correcta, usala. Un `<div>` solo se usa cuando ninguna etiqueta semántica describe el contenido.

### 2.3 Jerarquía de encabezados — estricta
- **Un solo `<h1>` por página**, que coincida con el `<title>`.
- `<h2>` para secciones principales, `<h3>` para subsecciones.
- **Nunca salteés niveles**: no pases de `<h2>` a `<h4>`.
- Los lectores de pantalla y el SEO dependen de esta jerarquía.

### 2.4 Listas
- `<ul>` para ítems sin orden relevante.
- `<ol>` para ítems en secuencia.
- Nunca uses múltiples `<br>` para simular listas o espaciado entre párrafos.

### 2.5 Formularios
- Cada campo tiene su `<label>` asociado con `for` + `id`.
- Usá `type` correcto en inputs: `email`, `tel`, `number`, `date`, `password`.
- Usá `required`, `minlength`, `pattern` para validación nativa.
- Los botones de envío son `<button type="submit">`, no `<div>`.

### 2.6 Multimedia
- Toda imagen tiene `alt` descriptivo. Si es decorativa: `alt=""`.
- `<video>` y `<audio>` incluyen subtítulos/transcripciones.
- Usá `loading="lazy"` en imágenes que no estén en el viewport inicial.

### 2.7 Links y navegación
- Texto de enlace descriptivo: "Ver propiedades en Mar del Plata", no "click aquí".
- Links externos usan `target="_blank" rel="noopener noreferrer"`.
- Para anclas internas: `<h2 id="sección">` + `<a href="#sección">`.

### 2.8 Antipatrones HTML prohibidos
- No uses `<br><br>` para separar párrafos → usá `<p>`.
- No uses `<b>` e `<i>` para énfasis semántico → usá `<strong>` y `<em>`.
- No uses tablas (`<table>`) para layout → son para datos tabulares únicamente.
- No saltees niveles de encabezado.
- No pongas múltiples `<h1>` en la misma página.

---

## 3. CSS mantenible y reutilizable (principio DRY)

> **DRY = Don't Repeat Yourself.** Si estás copiando y pegando estilos, lo estás haciendo mal.

- Definí estilos comunes **una sola vez** en clases reutilizables.
- **Agrupá selectores** que comparten estilos:
  ```css
  h1, h2, h3 { font-family: Arial, sans-serif; color: #333; }
  ```
- **Variables CSS en `:root`** para todos los valores repetidos:
  ```css
  :root {
    --color-primario: #007bff;
    --color-texto: #333;
    --fuente-base: Arial, sans-serif;
    --espaciado-base: 1rem;
  }
  .boton { background-color: var(--color-primario); }
  ```
- Preferí **clases sobre IDs** para estilos. Los IDs son para JS y anclas, no para CSS reutilizable.
- **Especificidad:** ID > clase > etiqueta. Si un estilo no aplica, revisá si algo más específico lo sobrescribe antes de agregar `!important`.
- **Nunca uses `!important`** salvo como último recurso muy justificado.

---

## 4. Nomenclatura de clases: metodología BEM

| Parte | Sintaxis | Ejemplo |
|---|---|---|
| **Bloque** | nombre del componente | `.card` |
| **Elemento** | bloque + `__` + parte | `.card__title` |
| **Modificador** | bloque/elemento + `--` + variante | `.card--featured` |

```css
.card { border: 1px solid #ccc; padding: 1rem; }
.card__title { font-size: 1.25rem; margin-bottom: 0.5rem; }
.card__image { width: 100%; height: auto; }
.card--featured { background-color: #f0f8ff; border-color: #007bff; }
```

---

## 5. Mobile-First: la regla que gobierna todo el CSS

> **Primero móvil. Siempre.**
> El CSS base resuelve la pantalla más pequeña (375px). Todo lo que viene después es una adaptación hacia arriba con `min-width`.

### Breakpoints estándar — siempre `min-width`, nunca `max-width`

```css
/* BASE: móvil (375px en adelante) — sin media query */
.componente { ... }

/* Tablet (768px en adelante) */
@media (min-width: 768px) { .componente { ... } }

/* Desktop (1024px en adelante) */
@media (min-width: 1024px) { .componente { ... } }

/* Desktop ancho (1280px en adelante) */
@media (min-width: 1280px) { .componente { ... } }
```

### Reglas Mobile-First obligatorias

- **Tipografía base:** mínimo 16px para cuerpo de texto. Escalá hacia arriba en breakpoints mayores.
- **Botones y áreas táctiles:** mínimo **44×44px** en móvil. Son dedos, no cursores.
- **Imágenes:** `width: 100%; max-width: 100%; height: auto;` como base. Nunca anchos fijos en px para imágenes en móvil.
- **Columnas:** en móvil todo apilado en una columna. Grillas de 2, 3 o 4 columnas solo en tablet/desktop.
- **Navegación:** en móvil: compacta o hamburguesa. En desktop: barra horizontal.
- **Espaciados:** unidades relativas (`rem`, `%`, `vw`) en vez de px fijos.
- **No ocultés contenido importante** solo en móvil con `display: none`.

### Ejemplo completo Mobile-First

```css
/* Tarjeta — BASE MÓVIL */
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  gap: 0.75rem;
}

/* Tarjeta — TABLET */
@media (min-width: 768px) {
  .card { flex-direction: row; padding: 1.5rem; }
}

/* Grilla — BASE MÓVIL: 1 columna */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Grilla — TABLET: 2 columnas */
@media (min-width: 768px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Grilla — DESKTOP: 3 columnas */
@media (min-width: 1024px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## 6. Layout: Flexbox y Grid

- **Flexbox** para una dimensión (fila o columna): menús, grupos de botones, tarjetas en fila.
- **CSS Grid** para dos dimensiones: layouts de página, grillas de contenido.
- Usá `gap` para espaciado entre elementos flex/grid. Nunca margins negativos.

---

## 7. Antipatrones CSS prohibidos

- **NO uses `float` para layout.** Solo para texto rodeando imagen. → Alternativa: Flexbox / Grid.
- **NO uses `display: inline-block` para alinear en fila** (genera espacios fantasma). → Alternativa: Flexbox con `gap`.
- **NO uses `max-width` en media queries** (es Desktop-First, lo opuesto). Siempre `min-width`.
- **NO uses px fijos** para anchos de contenedores ni imágenes. Usá `%`, `vw`, `rem`, `max-width`.
- **NO uses `!important`** salvo necesidad muy justificada y documentada.

---

## 8. Accesibilidad web (obligatoria desde el inicio)

> La accesibilidad beneficia a todos: personas con discapacidades visuales, auditivas, motoras o cognitivas, adultos mayores, usuarios en condiciones difíciles. ~15-20% de la población mundial tiene alguna discapacidad. Un sitio inaccesible pierde esa audiencia y puede incumplir normativas legales.

### 8.1 Principios POUR — el marco base

| Principio | Qué significa | Ejemplo de falla |
|---|---|---|
| **Perceptible** | El contenido debe poder percibirse (vista, oído, tacto) | Imágenes sin `alt` |
| **Operable** | La interfaz debe funcionar con teclado, no solo con ratón | Menú desplegable solo con hover |
| **Comprensible** | Contenido e instrucciones claros y predecibles | Mensaje de error: "Error" sin explicación |
| **Robusto** | Funciona con tecnologías actuales y futuras, incluyendo lectores de pantalla | HTML inválido que rompe lectores de pantalla |

### 8.2 Texto alternativo en imágenes
- Imágenes informativas: `alt` descriptivo del contenido y función.
- Imágenes decorativas: `alt=""` (vacío, no ausente).
- No repitas en el `alt` lo que ya dice el texto circundante.

### 8.3 Navegación por teclado
- **Toda la funcionalidad debe ser operable con teclado** (Tab, Enter, Escape, flechas).
- Nunca elimines el **indicador de foco** (`outline`). Si el default no te gusta, reemplazalo por uno visible, no lo quites.
  ```css
  /* MAL */
  *:focus { outline: none; }

  /* BIEN */
  *:focus { outline: 2px solid var(--color-primario); outline-offset: 2px; }
  ```
- Los elementos interactivos (`<button>`, `<a>`, `<input>`) ya son focusables nativamente. Si usás `<div>` para algo interactivo, agregá `tabindex="0"` y manejo de teclado (lo que se evita usando la etiqueta semántica correcta desde el principio).

### 8.4 Contraste de color — ratios WCAG mínimos

| Nivel | Texto normal | Texto grande (+18pt o +14pt negrita) |
|---|---|---|
| **AA (estándar)** | **4.5:1** mínimo | 3:1 mínimo |
| AAA (mejorado) | 7:1 mínimo | 4.5:1 mínimo |

- Elementos interactivos (botones, links): mínimo **3:1** frente a colores adyacentes.
- Texto placeholder: cumplir el mismo ratio, no vale "es gris claro".
- Verificá con: DevTools del navegador · WebAIM Contrast Checker · extensión WAVE o Axe.
- **No transmitas información solo por color.** Combiná con forma, texto o patrón (ej: links con subrayado, no solo color diferente).

### 8.5 ARIA — solo cuando HTML no alcanza

> **Primera regla de ARIA: si existe un elemento HTML semántico que hace lo mismo, usalo. ARIA es el último recurso.**

- `<button>` siempre sobre `<div role="button">`.
- `<nav>` siempre sobre `<div role="navigation">`.

Cuándo sí usar ARIA: para widgets personalizados (acordeones, tabs, sliders, modales) que HTML nativo no describe completamente.

**Las tres categorías de atributos ARIA:**

```html
<!-- ROLES: qué es el elemento -->
<div role="tablist">...</div>

<!-- ESTADOS: propiedades dinámicas que cambian -->
<button aria-expanded="false">Menú</button>

<!-- PROPIEDADES: información adicional y relaciones -->
<input aria-labelledby="titulo-campo" aria-describedby="hint-campo">
<span id="titulo-campo">Email</span>
<span id="hint-campo">Ejemplo: nombre@empresa.com</span>
```

**Roles ARIA comunes:**

| Role | Uso |
|---|---|
| `navigation` | Región de navegación (preferir `<nav>`) |
| `main` | Contenido principal (preferir `<main>`) |
| `button` | Solo si no podés usar `<button>` |
| `dialog` | Ventanas modales |
| `alert` | Mensajes de error o alerta que el lector de pantalla anuncia automáticamente |
| `tablist` / `tab` / `tabpanel` | Pestañas interactivas |

**Errores comunes con ARIA a evitar:**
- Añadir ARIA sin implementar el comportamiento de teclado correspondiente.
- Usar ARIA en exceso: puede confundir a los lectores de pantalla.
- `role="button"` en un `<button>` (redundante e incorrecto).

### 8.6 Formularios accesibles
```html
<!-- Correcto: label asociado explícitamente -->
<label for="email">Email</label>
<input type="email" id="email" name="email" required
       aria-describedby="email-hint">
<span id="email-hint">Ejemplo: nombre@empresa.com</span>

<!-- Para campos con error -->
<input type="email" id="email" aria-invalid="true"
       aria-describedby="email-error">
<span id="email-error" role="alert">Ingresá un email válido.</span>
```

### 8.7 Componentes modales accesibles
```html
<dialog id="modal" aria-modal="true" aria-labelledby="modal-titulo">
  <h2 id="modal-titulo">Confirmar acción</h2>
  <p>¿Estás seguro de que querés continuar?</p>
  <button autofocus>Confirmar</button>
  <button onclick="document.getElementById('modal').close()">Cancelar</button>
</dialog>
```
- Al abrir el modal: el foco va al primer elemento interactivo dentro.
- Al cerrar: el foco regresa al elemento que lo abrió.
- La tecla Escape cierra el modal.
- El foco queda "atrapado" dentro del modal mientras está abierto.

---

## 9. Arquitectura de diseño y componentes

### 9.1 Diseño antes de código
- Planificá la estructura de la página antes de escribir HTML. Identificá secciones, jerarquía visual y flujo del usuario.
- Dividí la interfaz en **componentes reutilizables**: tarjeta, modal, formulario, nav, footer. Definí cada uno una sola vez y reutilizalo.

### 9.2 Diseño atómico — cómo pensar los componentes
| Nivel | Descripción | Ejemplo |
|---|---|---|
| **Átomos** | Elemento indivisible | Botón, input, ícono, label |
| **Moléculas** | Átomos que trabajan juntos | Campo de búsqueda (input + botón) |
| **Organismos** | Moléculas que forman una sección | Header (logo + nav + buscador) |
| **Templates** | Layout de página sin contenido real | Wireframe de la home |
| **Páginas** | Template con contenido real | La home con datos reales |

### 9.3 Patrones de navegación — elegí el correcto según el caso

| Patrón | Cuándo usarlo | Ejemplo real |
|---|---|---|
| **Top bar** | Sitios de marketing, pocos links (3-7) | Apple.com |
| **Side bar** | Paneles de administración, muchas páginas | LinkedIn desktop, Effora CRM |
| **Bottom bar** | Apps móviles, acceso rápido con el pulgar | Spotify mobile, Instagram mobile |

- En desktop podés usar sidebar o topbar.
- En móvil la sidebar colapsa (hamburguesa) o se convierte en bottombar.
- Mantené la navegación **consistente entre páginas**: misma ubicación, mismo orden.

### 9.4 Componentes web comunes — estructura esperada

**Tarjeta (card):**
```html
<article class="card">
  <img class="card__image" src="..." alt="descripción">
  <div class="card__body">
    <h2 class="card__title">Título</h2>
    <p class="card__description">Descripción breve.</p>
    <a class="card__link" href="#">Ver más</a>
  </div>
</article>
```

**Modal:**
```html
<button onclick="document.getElementById('mi-modal').showModal()">
  Abrir
</button>
<dialog id="mi-modal" aria-modal="true" aria-labelledby="modal-h">
  <h2 id="modal-h">Título del modal</h2>
  <p>Contenido</p>
  <button onclick="document.getElementById('mi-modal').close()">Cerrar</button>
</dialog>
```

**Formulario:**
```html
<form>
  <div class="form__group">
    <label class="form__label" for="nombre">Nombre</label>
    <input class="form__input" type="text" id="nombre" name="nombre" required>
  </div>
  <button class="form__submit" type="submit">Enviar</button>
</form>
```

---

## 10. SEO en página

- **`<title>`**: 50–60 caracteres, palabras clave al inicio, nombre de marca al final.
- **`<meta name="description">`**: 150–160 caracteres, resumen del valor de la página + llamado a la acción.
- HTML semántico + jerarquía de encabezados correcta = SEO + accesibilidad.
- Sitio rápido y mobile-friendly = factor de posicionamiento directo en Google.

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Effora - CRM y gestión de operaciones inmobiliarias</title>
  <meta name="description" content="Software para inmobiliarias: CRM, registro de operaciones y panel de medición. Ordená tu agencia en un solo lugar.">
</head>
```

---

## 11. GEO (optimización para buscadores con IA)

- Escribí en **lenguaje natural y conversacional**, anticipando preguntas reales.
- Incluí **secciones FAQ** con preguntas y respuestas claras.
- Aportá **información del autor o la organización** para credibilidad.

---

## 12. Datos estructurados (Schema.org)

- **JSON-LD** en `<script type="application/ld+json">` dentro del `<head>`.
- `@context` y `@type` son **obligatorios**. Siempre comillas dobles.
- Tipos comunes: `Organization`, `WebSite`, `WebPage`, `Article`, `FAQPage`, `Product`, `Person`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Effora",
  "url": "https://effora.com.ar"
}
</script>
```

Validar con: https://search.google.com/test/rich-results

---

## 13. Checklist de entrega — frontend completo

### HTML
- [ ] `<!DOCTYPE html>`, `lang="es"`, `charset`, `viewport` presentes.
- [ ] Etiquetas semánticas usadas correctamente (`header`, `nav`, `main`, `section`, `article`, `footer`).
- [ ] Un solo `<h1>`, jerarquía de encabezados sin saltos.
- [ ] Todas las imágenes tienen `alt`. Las decorativas tienen `alt=""`.
- [ ] Todos los inputs tienen `<label>` asociado con `for` + `id`.
- [ ] Links con texto descriptivo (no "click aquí").
- [ ] Sin `<br><br>` para espaciar párrafos. Sin tablas para layout.

### CSS
- [ ] CSS en archivo externo. Cero inline ni `<style>` en producción.
- [ ] Variables CSS en `:root` para colores, tipografías y espaciados.
- [ ] Clases nombradas con BEM.
- [ ] CSS base escrito para 375px sin media query. Adaptaciones con `min-width`.
- [ ] Botones y áreas táctiles: mínimo 44×44px en móvil.
- [ ] Imágenes: `width: 100%; height: auto;` como base.
- [ ] Columnas: apiladas en móvil, grilla en tablet/desktop.
- [ ] Sin `float` para layout, sin `inline-block` con hacks, sin `max-width` en media queries, sin `!important` innecesario.

### Accesibilidad
- [ ] Contraste de texto: mínimo 4.5:1 (AA) verificado con herramienta.
- [ ] Todos los elementos interactivos son operables con teclado.
- [ ] Indicador de foco visible en todos los elementos focusables.
- [ ] No se transmite información solo por color.
- [ ] Modales: foco atrapado, Escape cierra, foco regresa al origen.
- [ ] ARIA usado solo donde HTML semántico no alcanza.

### SEO/GEO
- [ ] `<title>` 50–60 caracteres en cada página.
- [ ] `<meta description>` 150–160 caracteres en cada página.
- [ ] JSON-LD de Schema.org validado con Rich Results Test.

### Pruebas
- [ ] Probado en 375px (móvil), 768px (tablet) y 1280px (desktop).
- [ ] Navegación completa por teclado (Tab a través de toda la página).
- [ ] Revisado con herramienta de accesibilidad (WAVE, Axe o Lighthouse).

import { chromium } from "playwright";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "assets", "projects");
const BASE = "C:/Users/mel_o/OneDrive/Desktop/Proyectos";
const NEXOVA = "C:/Users/mel_o/NEXOVA";

fs.mkdirSync(OUT, { recursive: true });

const MIME = {
  html: "text/html; charset=utf-8",
  css: "text/css",
  js: "application/javascript",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
  webp: "image/webp",
  ico: "image/x-icon",
  woff2: "font/woff2",
  json: "application/json",
};

function createStaticServer(root, port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath === "/") urlPath = "/index.html";
      const filePath = path.normalize(path.join(root, urlPath));
      if (!filePath.startsWith(path.normalize(root))) {
        res.writeHead(403);
        res.end();
        return;
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("404");
          return;
        }
        const ext = path.extname(filePath).slice(1).toLowerCase();
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);
      });
    });
    server.on("error", reject);
    server.listen(port, () => resolve(server));
  });
}

function closeServer(server) {
  return new Promise((resolve) => server.close(() => resolve()));
}

const jobs = [
  {
    name: "registro-landing",
    root: path.join(BASE, "Registro de operaciones Inmobiliarias/REGISTRO-DE-OPERACIONES/public/landing"),
    urlPath: "/index.html",
    port: 3010,
    viewport: { width: 1280, height: 800 },
  },
  {
    name: "registro-sistema",
    root: path.join(BASE, "Registro de operaciones Inmobiliarias/REGISTRO-DE-OPERACIONES/public"),
    urlPath: "/index.html",
    port: 3011,
    viewport: { width: 1280, height: 800 },
  },
  {
    name: "oube-landing",
    root: path.join(BASE, "Oube_repo/landing"),
    urlPath: "/index.html",
    port: 3012,
    viewport: { width: 1280, height: 800 },
  },
  {
    name: "oube-sistema",
    root: path.join(BASE, "Oube_repo/app"),
    urlPath: "/index.html",
    port: 3013,
    viewport: { width: 1280, height: 800 },
  },
  {
    name: "nexova-formulario",
    root: NEXOVA,
    urlPath: "/application.html",
    port: 3014,
    viewport: { width: 1280, height: 900 },
  },
  {
    name: "dashboard-tailwind",
    root: path.join(BASE, "dashboard sencillo en Tailwind CSS/melioubi-latam-dashboardsencillo-en-Tailwind-CSS"),
    urlPath: "/index.html",
    port: 3015,
    viewport: { width: 1280, height: 800 },
  },
  {
    name: "sistema-ia",
    root: path.join(BASE, "Web Effora/Web-Effora-2"),
    urlPath: "/Landing.html",
    port: 3016,
    viewport: { width: 1280, height: 800 },
  },
  {
    name: "melioubi-tienda",
    root: path.join(BASE, "Rama grupal"),
    urlPath: "/producto.html",
    port: 3017,
    viewport: { width: 1280, height: 900 },
  },
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const job of jobs) {
  if (!fs.existsSync(job.root)) {
    console.warn("SKIP (missing):", job.name, job.root);
    continue;
  }

  const server = await createStaticServer(job.root, job.port);
  const url = `http://127.0.0.1:${job.port}${job.urlPath}`;

  try {
    await page.setViewportSize(job.viewport);
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1500);
    const outFile = path.join(OUT, `${job.name}.png`);
    await page.screenshot({ path: outFile, fullPage: false });
    console.log("OK:", job.name, "->", outFile);
  } catch (error) {
    console.error("FAIL:", job.name, error.message);
  } finally {
    await closeServer(server);
  }
}

await browser.close();
console.log("Done.");

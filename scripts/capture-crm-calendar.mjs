import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "assets", "projects");
const ROOT = "C:/Users/mel_o/OneDrive/Desktop/Proyectos/Registro de operaciones Inmobiliarias/REGISTRO-DE-OPERACIONES/public";
const PORT = 3023;

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
  webmanifest: "application/manifest+json",
};

function createStaticServer(root, port) {
  return new Promise((resolve, reject) => {
    const normalizedRoot = path.normalize(root);
    const server = http.createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath === "/") urlPath = "/index.html";
      const filePath = path.normalize(path.join(normalizedRoot, urlPath));
      if (!filePath.startsWith(normalizedRoot)) {
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
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

function closeServer(server) {
  return new Promise((resolve) => server.close(() => resolve()));
}

const server = await createStaticServer(ROOT, PORT);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

try {
  await page.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    localStorage.setItem("roi_session", JSON.stringify({ token: "capture", user: { role: "admin" } }));
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const calendarBtn = page.locator('button[data-view="calendar"]');
  if (await calendarBtn.count()) {
    await calendarBtn.first().click();
    await page.waitForTimeout(1500);
  } else {
    await page.evaluate(() => {
      document.getElementById("appView")?.classList.remove("hidden");
      document.querySelectorAll(".view").forEach((view) => view.classList.add("hidden"));
      document.getElementById("calendarView")?.classList.remove("hidden");
    });
    await page.waitForTimeout(500);
  }

  const outFile = path.join(OUT, "crm-calendario.png");
  await page.locator("#calendarView").screenshot({ path: outFile });
  console.log("OK: crm-calendario ->", outFile);
} catch (error) {
  console.error("FAIL: crm-calendario", error.message);
} finally {
  await browser.close();
  await closeServer(server);
}

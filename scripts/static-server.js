const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2]);
const port = Number(process.argv[3]);

const mime = {
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

function loadRedirects() {
  const file = path.join(root, "_redirects");
  if (!fs.existsSync(file)) return new Map();

  const map = new Map();
  fs.readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .forEach((line) => {
      const parts = line.split(/\s+/);
      if (parts.length < 2) return;
      const from = parts[0];
      const to = parts[1];
      const status = parts[2] || "200";
      map.set(from, { to, status: Number(status) });
    });
  return map;
}

const redirects = loadRedirects();

function resolvePath(urlPath) {
  if (urlPath === "/") return "/index.html";

  const rule = redirects.get(urlPath);
  if (rule) {
    if (rule.status >= 300 && rule.status < 400) return { redirect: rule.to, status: rule.status };
    return { file: rule.to.startsWith("/") ? rule.to : `/${rule.to}` };
  }

  return { file: urlPath };
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
  const resolved = resolvePath(urlPath);

  if (resolved.redirect) {
    res.writeHead(resolved.status, { Location: resolved.redirect });
    res.end();
    return;
  }

  const filePath = path.normalize(path.join(root, resolved.file));
  if (!filePath.startsWith(root)) {
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
    res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write("ready\n");
});

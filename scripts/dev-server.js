const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT) || 3000;

const mime = {
  html: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "application/javascript; charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
  webp: "image/webp",
  mp4: "video/mp4",
  txt: "text/plain; charset=utf-8",
  json: "application/json",
};

http.createServer(function (req, res) {
  var urlPath = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  var filePath = path.normalize(path.join(root, urlPath));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    var ext = path.extname(filePath).slice(1).toLowerCase();
    res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, function () {
  console.log("ready http://localhost:" + port);
});

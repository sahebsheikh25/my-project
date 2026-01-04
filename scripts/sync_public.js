const fs = require('fs');
const path = require('path');

// Copies top-level HTML files and assets into the public/ folder to prepare for Vercel static deploy.
// Usage: node scripts/sync_public.js

const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

// create public folder if not exists
if (!fs.existsSync(PUBLIC)) {
  fs.mkdirSync(PUBLIC);
}

// files/folders to copy
const ITEMS = [
  "index.html",
  "roadmap.html",
  "tools.html",
  "ctf-news.html",
  "osint.html",
  "about.html",
  "contact.html",
  "legal.html",
  "style.css",
  "script.js",
  "ads.js",
  "assets"
];

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(file =>
      copyRecursive(path.join(src, file), path.join(dest, file))
    );
  } else {
    fs.copyFileSync(src, dest);
  }
}

ITEMS.forEach(item => {
  copyRecursive(
    path.join(ROOT, item),
    path.join(PUBLIC, item)
  );
});

console.log("✅ public/ folder synced successfully");

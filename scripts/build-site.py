"""Validate local site dependencies and stage static files for Cloudflare Pages."""
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
from html.parser import HTMLParser
import re
import shutil
import sys

ROOT = Path(".")
OUTPUT = ROOT / "dist"
pages = sorted(ROOT.glob("*.html"))
references = set()
errors = []

class Dependencies(HTMLParser):
    def __init__(self, page):
        super().__init__()
        self.page = page

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("src", "href", "poster"):
            value = attrs.get(key, "")
            if not value or value.startswith(("data:", "mailto:", "tel:", "javascript:", "#", "//")):
                continue
            parsed = urlsplit(value)
            if parsed.scheme or parsed.netloc:
                continue
            normalized = unquote(urlsplit(urljoin("https://local.invalid/" + self.page, value)).path).lstrip("/")
            references.add(normalized)

if not (ROOT / "index.html").is_file():
    raise SystemExit("index.html ana dizinde bulunamadi.")

for page in pages:
    text = page.read_text(encoding="utf-8-sig")
    Dependencies(page.as_posix()).feed(text)
    references.update(re.findall(r"assets/[A-Za-z0-9_./-]+\.(?:css|js|webp|jpe?g|png|svg|gif|woff2?|ttf|ico)", text, re.I))

for file in list(ROOT.glob("assets/**/*.css")) + list(ROOT.glob("assets/**/*.js")):
    text = file.read_text(encoding="utf-8-sig", errors="replace")
    references.update(re.findall(r"assets/[A-Za-z0-9_./-]+\.(?:css|js|webp|jpe?g|png|svg|gif|woff2?|ttf|ico)", text, re.I))
    if file.suffix == ".css":
        for value in re.findall(r"""url\(\s*["']?([^"')\s]+)""", text, re.I):
            if value.startswith(("data:", "https:", "http:", "//", "#")):
                continue
            references.add(unquote(urlsplit(urljoin("https://local.invalid/" + file.as_posix(), value)).path).lstrip("/"))

for value in sorted(references):
    path = ROOT / value
    if not path.is_file():
        errors.append(value)
    elif path.stat().st_size == 0:
        errors.append(value + " (empty)")

if errors:
    print("Yayin durduruldu. Eksik dosyalar:\n" + "\n".join(errors), file=sys.stderr)
    raise SystemExit(1)

if OUTPUT.exists():
    shutil.rmtree(OUTPUT)
OUTPUT.mkdir()
for page in pages:
    shutil.copy2(page, OUTPUT / page.name)
shutil.copytree(ROOT / "assets", OUTPUT / "assets", ignore=shutil.ignore_patterns(".gitkeep"))
for name in ("robots.txt", "sitemap.xml", "_headers", "_redirects"):
    if (ROOT / name).is_file():
        shutil.copy2(ROOT / name, OUTPUT / name)
print(f"Yayina hazir: {len(pages)} HTML sayfasi ve {len(references)} yerel baglanti dogrulandi.")

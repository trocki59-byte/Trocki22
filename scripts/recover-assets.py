"""Recover this site's missing public assets without changing its HTML pages."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path, PurePosixPath
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import Request, urlopen
import json
import re
import time

ROOT = Path(".")
ORIGINS = ("https://trocki22.com.tr/", "https://www.trocki22.com.tr/")
HEADERS = {"User-Agent": "Trocki22-Migration/1.0 (site-owner-authorized public asset backup)"}
ASSET = re.compile(r"assets/[A-Za-z0-9_./-]+\.(?:css|js|webp|jpe?g|png|svg|gif|woff2?|ttf|ico)", re.I)
CSS_URL = re.compile(r"""url\(\s*["']?([^"')\s]+)""", re.I)
allowed = {".css", ".js", ".webp", ".jpg", ".jpeg", ".png", ".svg", ".gif", ".woff", ".woff2", ".ttf", ".ico"}
report = {"recovered": [], "failed": []}

def safe_path(value):
    path = PurePosixPath(value)
    return str(path) if path.parts and path.parts[0] == "assets" and ".." not in path.parts and path.suffix.lower() in allowed else None

def references():
    result = set()
    for path in list(ROOT.glob("*.html")) + list(ROOT.glob("assets/**/*.css")) + list(ROOT.glob("assets/**/*.js")):
        content = path.read_text(encoding="utf-8-sig", errors="replace")
        result.update(m.group(0) for m in ASSET.finditer(content))
        if path.suffix == ".css":
            for match in CSS_URL.finditer(content):
                raw = match.group(1)
                if raw.startswith(("data:", "http:", "https:", "//", "#")):
                    continue
                resolved = urlsplit(urljoin("https://local.invalid/" + path.as_posix(), raw)).path.lstrip("/")
                result.add(unquote(resolved))
    return {item for value in result if (item := safe_path(value))}

def validate(data, suffix):
    if not data or len(data) > 25 * 1024 * 1024:
        raise ValueError("empty or oversized asset")
    lead = data[:1024].lstrip().lower()
    if lead.startswith((b"<!doctype html", b"<html")):
        raise ValueError("HTML returned instead of asset")
    if suffix == ".webp" and not (data[:4] == b"RIFF" and data[8:12] == b"WEBP"):
        raise ValueError("invalid WebP")
    if suffix in (".jpg", ".jpeg") and data[:3] != b"\xff\xd8\xff":
        raise ValueError("invalid JPEG")
    if suffix == ".png" and data[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError("invalid PNG")

def recover(value):
    destination = ROOT / value
    errors = []
    for origin in ORIGINS:
        for attempt in range(1):
            try:
                request = Request(urljoin(origin, value), headers=HEADERS)
                with urlopen(request, timeout=12) as response:
                    if urlsplit(response.geturl()).hostname not in ("trocki22.com.tr", "www.trocki22.com.tr"):
                        raise ValueError("redirect outside site")
                    data = response.read(25 * 1024 * 1024 + 1)
                validate(data, destination.suffix.lower())
                destination.parent.mkdir(parents=True, exist_ok=True)
                destination.write_bytes(data)
                return {"path": value, "bytes": len(data), "source": origin}
            except Exception as error:
                errors.append(str(error))
                if attempt == 0:
                    time.sleep(0.2)
    return {"path": value, "error": " | ".join(dict.fromkeys(errors))}

attempted = set()
for _ in range(6):
    required = references()
    missing = sorted(value for value in required if not (ROOT / value).is_file() and value not in attempted)
    if not missing:
        break
    attempted.update(missing)
    print(f"Fetching {len(missing)} missing assets", flush=True)
    with ThreadPoolExecutor(max_workers=6) as pool:
        for outcome in pool.map(recover, missing):
            key = "failed" if "error" in outcome else "recovered"
            report[key].append(outcome)
            print(json.dumps(outcome, ensure_ascii=False), flush=True)

required = references()
missing = sorted(value for value in required if not (ROOT / value).is_file())
report["required_count"] = len(required)
report["missing"] = missing
Path("asset-recovery-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
if missing:
    raise SystemExit(f"Recovery incomplete: {len(missing)} missing assets; production was not changed.")
print(f"Verified: all {len(required)} referenced local assets exist.", flush=True)

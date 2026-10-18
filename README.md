# TROÇKİ22

Statik site kaynakları. Ana giriş dosyası `index.html`; sayfalar, stiller ve görseller birlikte yayımlanır.

## Cloudflare Pages ayarları

- Git deposu: `trocki59-byte/Trocki22`
- Production branch: `main`
- Framework preset: `None`
- Build command: `python3 scripts/build-site.py`
- Build output directory: `dist`
- Root directory: boş

Hazırlama komutu yerel dosya bağlantılarını kontrol eder. Eksik bir görsel, stil veya betik varsa yayın durdurulur. Yalnızca site dosyaları `dist` içine kopyalanır.

Önce Pages önizleme adresi doğrulanır; ardından özel alan adı bağlanır. Bu depoyu hazırlamak tek başına Inetmar veya alan adı ayarlarını değiştirmez.

## Eksik dosyaların tamamlanması

`Trocki22 - Eksik dosyalari topluca al` iş akışı, mevcut sitedeki eksik `assets` dosyalarını almayı dener. Tüm dosyalar bulunursa depoya kaydeder. Bulunamayan dosyalar aktarım raporunda belirtilir.

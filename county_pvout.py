"""Build Iowa county PVOUT values from a Solargis GeoTIFF and the Census county gazetteer.

Inputs
  1. Solargis PVOUT GeoTIFF (unzip the free "LTAy Avg Daily Totals" download first)
  2. Census county gazetteer: 2026_Gaz_counties_national.zip (or the .txt inside it)
     https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2026_Gazetteer/2026_Gaz_counties_national.zip
     It lists each county's internal point (INTPTLAT, INTPTLONG), a geographic interior point,
     not the population center.

Usage
  pip install rasterio
  python county_pvout.py info  PVOUT.tif                      # print layers, units, CRS
  python county_pvout.py build PVOUT.tif 2026_Gaz_counties_national.zip --per-day
  (use --per-day when the raster holds kWh/kWp per DAY; the script multiplies by 365)

Output: iowa_pvout.json  ->  {"Story": 1352.4, ...}  in kWh/kWp per year. Send this file back.
"""
import csv, io, json, math, sys, zipfile
import rasterio
from rasterio.warp import transform

def info(path):
    with rasterio.open(path) as src:
        print("CRS:", src.crs, "| size:", src.width, "x", src.height, "| bands:", src.count)
        print("nodata:", src.nodata, "| band descriptions:", src.descriptions)
        print("dataset tags:", src.tags())
        for i in range(1, src.count + 1):
            print(f"band {i} tags:", src.tags(i))

def read_gazetteer(path):
    raw = zipfile.ZipFile(path).read(next(n for n in zipfile.ZipFile(path).namelist() if n.endswith(".txt"))).decode("utf-8", "replace") \
          if path.endswith(".zip") else open(path, encoding="utf-8", errors="replace").read()
    delim = "|" if raw.splitlines()[0].count("|") > raw.splitlines()[0].count("\t") else "\t"
    rows = csv.DictReader(io.StringIO(raw), delimiter=delim)
    for r in rows:
        r = {k.strip(): (v or "").strip() for k, v in r.items() if k}
        if r.get("USPS") == "IA":
            lat = next(v for k, v in r.items() if k.startswith("INTPTLAT"))
            lon = next(v for k, v in r.items() if k.startswith("INTPTLONG"))
            yield r["NAME"].replace(" County", ""), float(lat), float(lon)

def build(tif, gaz, per_day, band=1):
    pts = list(read_gazetteer(gaz))
    if len(pts) != 99:
        print(f"warning: expected 99 Iowa counties, found {len(pts)}")
    out = {}
    with rasterio.open(tif) as src:
        lons, lats = [p[2] for p in pts], [p[1] for p in pts]
        xs, ys = transform("EPSG:4326", src.crs, lons, lats)
        for (name, _, _), val in zip(pts, src.sample(list(zip(xs, ys)), indexes=band)):
            v = float(val[0])
            if math.isnan(v) or (src.nodata is not None and not math.isnan(src.nodata) and v == src.nodata):
                print("no data for", name); continue
            out[name] = round(v * 365 if per_day else v, 1)
    if out and not per_day and max(out.values()) < 10:
        print("WARNING: values look like kWh/kWp per DAY. Re-run with --per-day.")
    json.dump(out, open("iowa_pvout.json", "w"), indent=1, sort_keys=True)
    print("wrote iowa_pvout.json:", len(out), "counties; min", min(out.values()), "max", max(out.values()))

if __name__ == "__main__":
    if len(sys.argv) >= 3 and sys.argv[1] == "info":
        info(sys.argv[2])
    elif len(sys.argv) >= 4 and sys.argv[1] == "build":
        build(sys.argv[2], sys.argv[3], "--per-day" in sys.argv)
    else:
        print(__doc__)

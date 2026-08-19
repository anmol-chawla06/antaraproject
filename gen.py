import json
import urllib.request
import sys

# Simplified GeoJSON of India states (this is a popular, well-maintained source)
url = "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson"

print("Fetching GeoJSON from GitHub...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=30) as response:
        data = json.loads(response.read().decode())
    print(f"Got {len(data['features'])} features")
except Exception as e:
    print(f"Error fetching GeoJSON: {e}")
    sys.exit(1)

minLon, maxLon = 68.0, 97.5
minLat, maxLat = 6.5, 37.0
viewW, viewH = 800, 900
pad = 30

def project(lon, lat):
    x = pad + (lon - minLon) / (maxLon - minLon) * (viewW - 2 * pad)
    y = pad + (maxLat - lat) / (maxLat - minLat) * (viewH - 2 * pad)
    return round(x, 2), round(y, 2)

# Name normalization mapping
name_map = {
    "Andaman & Nicobar Island": "Andaman and Nicobar Islands",
    "Andaman & Nicobar Islands": "Andaman and Nicobar Islands",
    "Andaman and Nicobar": "Andaman and Nicobar Islands",
    "Arunanchal Pradesh": "Arunachal Pradesh",
    "NCT of Delhi": "Delhi",
    "Nct Of Delhi": "Delhi",
    "Jammu & Kashmir": "Jammu and Kashmir",
    "Dadara & Nagar Havelli": "Dadra and Nagar Haveli and Daman and Diu",
    "Dadra & Nagar Haveli": "Dadra and Nagar Haveli and Daman and Diu",
    "Daman & Diu": "Dadra and Nagar Haveli and Daman and Diu",
    "Orissa": "Odisha",
    "Telangana": "Telangana",
    "Uttaranchal": "Uttarakhand",
    "Pondicherry": "Puducherry",
    "Chattisgarh": "Chhattisgarh",
}

state_paths = {}

def simplify_ring(ring, tolerance=0.08):
    """Douglas-Peucker simplification to reduce point count while preserving shape"""
    if len(ring) <= 4:
        return ring
    
    def point_line_dist(p, a, b):
        dx = b[0] - a[0]
        dy = b[1] - a[1]
        if dx == 0 and dy == 0:
            return ((p[0]-a[0])**2 + (p[1]-a[1])**2)**0.5
        t = max(0, min(1, ((p[0]-a[0])*dx + (p[1]-a[1])*dy) / (dx*dx + dy*dy)))
        proj_x = a[0] + t * dx
        proj_y = a[1] + t * dy
        return ((p[0]-proj_x)**2 + (p[1]-proj_y)**2)**0.5
    
    max_d = 0
    max_i = 0
    for i in range(1, len(ring)-1):
        d = point_line_dist(ring[i], ring[0], ring[-1])
        if d > max_d:
            max_d = d
            max_i = i
    
    if max_d > tolerance:
        left = simplify_ring(ring[:max_i+1], tolerance)
        right = simplify_ring(ring[max_i:], tolerance)
        return left[:-1] + right
    else:
        return [ring[0], ring[-1]]

for feature in data['features']:
    props = feature['properties']
    # Try different property names used by various GeoJSON sources
    name = props.get('NAME_1') or props.get('st_nm') or props.get('name') or props.get('NAME') or ''
    name = name_map.get(name, name)
    
    if not name:
        continue
    
    geom = feature['geometry']
    coords = geom['coordinates']
    geom_type = geom['type']
    
    path_parts = []
    all_x = []
    all_y = []
    
    def process_ring(ring):
        # Simplify the ring to reduce file size
        simplified = simplify_ring(ring, tolerance=0.06)
        if len(simplified) < 3:
            simplified = ring[:4] if len(ring) >= 4 else ring
        
        parts = []
        for i, pt in enumerate(simplified):
            lon, lat = pt[0], pt[1]
            x, y = project(lon, lat)
            all_x.append(x)
            all_y.append(y)
            if i == 0:
                parts.append(f"M{x} {y}")
            else:
                parts.append(f"L{x} {y}")
        parts.append("Z")
        return " ".join(parts)
    
    if geom_type == 'Polygon':
        for ring in coords:
            path_parts.append(process_ring(ring))
    elif geom_type == 'MultiPolygon':
        for multipoly in coords:
            for ring in multipoly:
                path_parts.append(process_ring(ring))
    
    if not all_x:
        continue
        
    path_str = " ".join(path_parts)
    bbox = [min(all_x), min(all_y), max(all_x), max(all_y)]
    centroid = [(bbox[0]+bbox[2])/2, (bbox[1]+bbox[3])/2]
    
    if name not in state_paths:
        state_paths[name] = {"d": path_str, "bbox": bbox, "centroid": [round(centroid[0],1), round(centroid[1],1)]}
    else:
        # Merge multi-part states
        state_paths[name]["d"] += " " + path_str
        b = state_paths[name]["bbox"]
        state_paths[name]["bbox"] = [min(b[0], bbox[0]), min(b[1], bbox[1]), max(b[2], bbox[2]), max(b[3], bbox[3])]
        nb = state_paths[name]["bbox"]
        state_paths[name]["centroid"] = [round((nb[0]+nb[2])/2,1), round((nb[1]+nb[3])/2,1)]

# Check which states we got
requested = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
]

print(f"\nGenerated {len(state_paths)} states from GeoJSON")
print("States found:", sorted(state_paths.keys()))

missing = [s for s in requested if s not in state_paths]
if missing:
    print(f"\nMissing states: {missing}")
    # For Ladakh (carved from J&K in 2019, may not be in older GeoJSON), create a placeholder
    # based on approximate coordinates
    placeholders = {
        "Ladakh": {
            "coords": [(76.0,32.5),(76.5,33.5),(77.5,34.5),(78.5,35.0),(79.5,34.2),(78.5,33.0),(77.5,32.2)],
        },
        "Chandigarh": {
            "coords": [(76.7,30.7),(76.8,30.7),(76.8,30.8),(76.7,30.8)],
        },
        "Lakshadweep": {
            "coords": [(72.0,10.0),(72.5,10.0),(72.5,12.5),(72.0,12.5)],
        },
        "Puducherry": {
            "coords": [(79.8,11.9),(79.9,11.9),(79.9,12.0),(79.8,12.0)],
        },
    }
    for name in missing:
        if name in placeholders:
            ring = placeholders[name]["coords"]
            parts = []
            xs, ys = [], []
            for i, (lon, lat) in enumerate(ring):
                x, y = project(lon, lat)
                xs.append(x); ys.append(y)
                parts.append(f"{'M' if i==0 else 'L'}{x} {y}")
            parts.append("Z")
            bbox = [min(xs), min(ys), max(xs), max(ys)]
            state_paths[name] = {
                "d": " ".join(parts),
                "bbox": bbox,
                "centroid": [round((bbox[0]+bbox[2])/2,1), round((bbox[1]+bbox[3])/2,1)]
            }
        else:
            print(f"  WARNING: No data for {name}, creating empty placeholder")
            state_paths[name] = {"d": "M0 0Z", "bbox": [0,0,0,0], "centroid": [0,0]}

# Round bbox values
for name in state_paths:
    b = state_paths[name]["bbox"]
    state_paths[name]["bbox"] = [round(b[0],1), round(b[1],1), round(b[2],1), round(b[3],1)]

# Generate JS output
js_lines = ['window.INDIA_VIEWBOX = [0, 0, 800, 900];', '',
            'window.PROJECT_BOUNDS = {',
            '  minLon: 68.0,', '  maxLon: 97.5,',
            '  minLat: 6.5,', '  maxLat: 37.0,',
            '  viewW: 800,', '  viewH: 900,',
            '  pad: 30', '};', '',
            'window.INDIA_STATE_PATHS = {']

# Sort states alphabetically
for i, name in enumerate(sorted(state_paths.keys())):
    info = state_paths[name]
    comma = ',' if i < len(state_paths)-1 else ''
    js_lines.append(f'  "{name}": {{')
    js_lines.append(f'    "d": "{info["d"]}",')
    js_lines.append(f'    "centroid": [{info["centroid"][0]}, {info["centroid"][1]}],')
    js_lines.append(f'    "bbox": [{info["bbox"][0]}, {info["bbox"][1]}, {info["bbox"][2]}, {info["bbox"][3]}]')
    js_lines.append(f'  }}{comma}')

js_lines.append('};')
js_lines.append('')

output = '\n'.join(js_lines)

with open("map-data.js", "w", encoding='utf-8') as f:
    f.write(output)

print(f"\nmap-data.js generated ({len(output)} bytes)")
print("Done!")

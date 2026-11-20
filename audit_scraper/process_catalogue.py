import json
import re
from html.parser import HTMLParser
import sys

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

class HTMLFilter(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
    def handle_data(self, data):
        self.text.append(data)

def clean_html(raw_html):
    if not raw_html:
        return ""
    f = HTMLFilter()
    try:
        f.feed(raw_html)
        return ' '.join(''.join(f.text).split())
    except Exception:
        return re.sub(r'<[^>]+>', ' ', raw_html)

with open('audit_scraper/data/wc_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

with open('audit_scraper/data/wp_products.json', 'r', encoding='utf-8') as f:
    wp_products = {p['id']: p for p in json.load(f)}

processed = []

for p in products:
    p_id = p.get('id')
    wp_p = wp_products.get(p_id, {})
    
    price_info = p.get('prices', {})
    currency_minor = price_info.get('currency_minor_unit', 2)
    div = 10 ** currency_minor
    
    price = float(price_info.get('price', 0)) / div if price_info.get('price') else 0.0
    reg_price = float(price_info.get('regular_price', 0)) / div if price_info.get('regular_price') else price
    sale_price = float(price_info.get('sale_price', 0)) / div if price_info.get('sale_price') else None

    # Categories
    categories = [c.get('name') for c in p.get('categories', [])]
    
    # Images
    images = [img.get('src') for img in p.get('images', [])]
    
    # Attributes & variations
    attributes = p.get('attributes', [])
    variations = p.get('variations', [])
    
    short_desc = clean_html(p.get('short_description', ''))
    full_desc = clean_html(p.get('description', ''))
    raw_desc = p.get('description', '')
    
    processed.append({
        'id': p_id,
        'name': p.get('name'),
        'slug': p.get('slug'),
        'permalink': p.get('permalink'),
        'sku': p.get('sku'),
        'price': price,
        'regular_price': reg_price,
        'sale_price': sale_price,
        'categories': categories,
        'images': images,
        'attributes': attributes,
        'variations': variations,
        'short_description': short_desc,
        'description': full_desc,
        'raw_description': raw_desc,
        'is_in_stock': p.get('is_in_stock', True)
    })

with open('audit_scraper/data/processed_products.json', 'w', encoding='utf-8') as f:
    json.dump(processed, f, indent=2, ensure_ascii=False)

print(f"Processed {len(processed)} products successfully.")
for item in processed:
    print(f"- {item['sku']}: {item['name']} | Cat: {item['categories']} | Price: ₹{item['price']} (Reg: ₹{item['regular_price']})")

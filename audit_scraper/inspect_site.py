import json
import re
from html.parser import HTMLParser
import sys

# Ensure stdout handles utf-8
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

def inspect_pages():
    with open('audit_scraper/data/pages.json', 'r', encoding='utf-8') as f:
        pages = json.load(f)
    print("=== PAGES AUDIT ===")
    for p in pages:
        title = p.get('title', {}).get('rendered', '')
        slug = p.get('slug', '')
        content = p.get('content', {}).get('rendered', '')
        text = clean_html(content)
        print(f"PAGE: {title} | slug: {slug} | link: {p.get('link')}")
        print(f"Content excerpt: {text[:200]}...")
        print()

def inspect_products():
    with open('audit_scraper/data/wc_products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
    print("\n=== PRODUCTS AUDIT ===")
    print(f"Total products: {len(products)}")
    for p in products:
        name = p.get('name')
        slug = p.get('slug')
        sku = p.get('sku')
        price_info = p.get('prices', {})
        price = price_info.get('price')
        reg_price = price_info.get('regular_price')
        sale_price = price_info.get('sale_price')
        cats = [c.get('name') for c in p.get('categories', [])]
        images = [img.get('src') for img in p.get('images', [])]
        short_desc = clean_html(p.get('short_description', ''))
        desc = clean_html(p.get('description', ''))
        attrs = p.get('attributes', [])
        
        print(f"PRODUCT: {name} (Slug: {slug}, SKU: {sku})")
        print(f"  Categories: {', '.join(cats)}")
        print(f"  Prices: Current={price}, Regular={reg_price}, Sale={sale_price}")
        print(f"  Images ({len(images)}): {images[:2]}")
        print(f"  Attributes: {attrs}")
        print(f"  Short Desc: {short_desc[:150]}")
        print(f"  Full Desc: {desc[:200]}")
        print("-" * 60)

if __name__ == '__main__':
    inspect_pages()
    inspect_products()

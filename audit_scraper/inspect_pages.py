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

with open('audit_scraper/data/pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

for p in pages:
    slug = p['slug']
    if slug in ['about-us', 'contact-us', 'privacy-policy', 'home', 'shop']:
        print(f"=== SLUG: {slug} (Title: {p['title']['rendered']}) ===")
        text = clean_html(p['content']['rendered'])
        print(text)
        print("="*60)

import re
import json

with open('audit_scraper/data/pages.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

homepage = [p for p in pages if p['slug'] in ['home', '']]
if homepage:
    content = homepage[0]['content']['rendered']
    with open('audit_scraper/data/homepage_raw.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Saved homepage_raw.html, length:", len(content))

with open('C:/Users/Lenovo/.gemini/antigravity/brain/5ae06ab6-e88e-4beb-a8ee-c8b085fba844/.system_generated/steps/4/content.md', 'r', encoding='utf-8') as f:
    live_html = f.read()

phones = re.findall(r'(?:\+?91[\-\s]?)?[6789]\d{9}', live_html)
emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', live_html)
instagram = re.findall(r'https?://(?:www\.)?instagram\.com/[a-zA-Z0-9_.-]+', live_html)
facebook = re.findall(r'https?://(?:www\.)?facebook\.com/[a-zA-Z0-9_.-]+', live_html)

print("Phones found:", set(phones))
print("Emails found:", set(emails))
print("Instagram found:", set(instagram))
print("Facebook found:", set(facebook))

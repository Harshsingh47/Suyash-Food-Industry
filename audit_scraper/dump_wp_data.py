import urllib.request
import json
import xml.etree.ElementTree as ET
import os

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def fetch_url(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read()
    except Exception as e:
        print(f"Failed {url}: {e}")
        return None

def fetch_json(url):
    raw = fetch_url(url)
    if raw:
        try:
            return json.loads(raw.decode('utf-8'))
        except Exception as e:
            print(f"JSON error {url}: {e}")
    return None

def main():
    os.makedirs('audit_scraper/data', exist_ok=True)
    
    # 1. Pages
    print("Fetching pages...")
    pages = fetch_json('https://suyashfoodindustries.in/wp-json/wp/v2/pages?per_page=100')
    with open('audit_scraper/data/pages.json', 'w', encoding='utf-8') as f:
        json.dump(pages, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(pages) if pages else 0} pages")

    # 2. Posts (blogs)
    print("Fetching posts...")
    posts = fetch_json('https://suyashfoodindustries.in/wp-json/wp/v2/posts?per_page=100')
    with open('audit_scraper/data/posts.json', 'w', encoding='utf-8') as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(posts) if posts else 0} posts")

    # 3. WC Store Products
    print("Fetching WC Store Products...")
    wc_products = fetch_json('https://suyashfoodindustries.in/wp-json/wc/store/v1/products?per_page=100')
    with open('audit_scraper/data/wc_products.json', 'w', encoding='utf-8') as f:
        json.dump(wc_products, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(wc_products) if wc_products else 0} WC products")

    # 4. WP Product CPT
    print("Fetching WP Products CPT...")
    wp_products = fetch_json('https://suyashfoodindustries.in/wp-json/wp/v2/product?per_page=100')
    with open('audit_scraper/data/wp_products.json', 'w', encoding='utf-8') as f:
        json.dump(wp_products, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(wp_products) if wp_products else 0} WP CPT products")

    # 5. Product Categories
    print("Fetching Product Categories...")
    cats = fetch_json('https://suyashfoodindustries.in/wp-json/wc/store/v1/products/categories?per_page=100')
    with open('audit_scraper/data/categories.json', 'w', encoding='utf-8') as f:
        json.dump(cats, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(cats) if cats else 0} categories")

    # 6. WP Product Cat
    wp_cats = fetch_json('https://suyashfoodindustries.in/wp-json/wp/v2/product_cat?per_page=100')
    with open('audit_scraper/data/wp_categories.json', 'w', encoding='utf-8') as f:
        json.dump(wp_cats, f, indent=2, ensure_ascii=False)

    # 7. Product Tags
    print("Fetching Product Tags...")
    tags = fetch_json('https://suyashfoodindustries.in/wp-json/wp/v2/product_tag?per_page=100')
    with open('audit_scraper/data/tags.json', 'w', encoding='utf-8') as f:
        json.dump(tags, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(tags) if tags else 0} tags")

    # 8. Sitemap Index
    print("Fetching sitemaps...")
    sitemap = fetch_url('https://suyashfoodindustries.in/wp-sitemap.xml')
    if sitemap:
        with open('audit_scraper/data/sitemap_index.xml', 'wb') as f:
            f.write(sitemap)
        # Parse sitemap URLs
        root = ET.fromstring(sitemap)
        for s in root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}sitemap'):
            loc = s.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text
            filename = loc.split('/')[-1]
            sub = fetch_url(loc)
            if sub:
                with open(f'audit_scraper/data/{filename}', 'wb') as f:
                    f.write(sub)
                print(f"Saved sub-sitemap {filename}")

    print("All initial dumps completed successfully.")

if __name__ == '__main__':
    main()

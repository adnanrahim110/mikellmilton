-- Product (single title with two digital formats)
INSERT INTO products (slug, title, description, active)
VALUES ('the-dope-breakthrough', 'The D.O.P.E Breakthrough', 'Official digital editions', 1)
ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), active=VALUES(active);

-- Audiobook (zip) — maps to BOOKS id:1 "EB - Album" (165.00)
INSERT INTO product_formats (product_id, format, sku, price_cents, compare_at_cents, inventory, weight_g, is_digital, file_url)
SELECT p.id, 'audiobook', 'DOPE-AB', 16500, NULL, NULL, NULL, 1, 'audiobooks/the-dope-breakthrough.zip'
FROM products p WHERE p.slug='the-dope-breakthrough'
ON DUPLICATE KEY UPDATE price_cents=VALUES(price_cents), file_url=VALUES(file_url), is_digital=VALUES(is_digital);

-- eBook (pdf) — maps to BOOKS id:2 "E - Book" (65.00)
INSERT INTO product_formats (product_id, format, sku, price_cents, compare_at_cents, inventory, weight_g, is_digital, file_url)
SELECT p.id, 'ebook', 'DOPE-EB', 6500, NULL, NULL, NULL, 1, 'ebooks/the-dope-breakthrough.pdf'
FROM products p WHERE p.slug='the-dope-breakthrough'
ON DUPLICATE KEY UPDATE price_cents=VALUES(price_cents), file_url=VALUES(file_url), is_digital=VALUES(is_digital);

-- Optional coupon used in the UI helpers
INSERT INTO coupons (code, type, value, active)
VALUES ('DOPE10', 'percent', 10, 1)
ON DUPLICATE KEY UPDATE value=VALUES(value), active=VALUES(active);

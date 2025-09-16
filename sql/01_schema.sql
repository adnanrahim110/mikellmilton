CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(191) UNIQUE NOT NULL,
  title VARCHAR(191) NOT NULL,
  description TEXT,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_formats (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id BIGINT NOT NULL,
  format ENUM('ebook','audiobook','paperback') NOT NULL,
  sku VARCHAR(64) UNIQUE,
  price_cents INT NOT NULL,
  compare_at_cents INT,
  inventory INT NULL,                 -- NULL = unlimited (digital)
  weight_g INT NULL,                  -- used later for physical
  is_digital TINYINT(1) NOT NULL DEFAULT 1,
  file_url VARCHAR(512) NULL,         -- e.g. "ebooks/soul.pdf" or "audiobooks/soul.zip" under protected/
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS customers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(191) NOT NULL,
  name VARCHAR(191),
  phone VARCHAR(64),
  UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS addresses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(191) NOT NULL,
  line1 VARCHAR(191) NOT NULL,
  line2 VARCHAR(191),
  city VARCHAR(191) NOT NULL,
  state VARCHAR(191),
  postal_code VARCHAR(64),
  country VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  public_id CHAR(12) UNIQUE NOT NULL,
  customer_id BIGINT NULL,
  email VARCHAR(191) NOT NULL,
  phone VARCHAR(64),
  billing_address_id BIGINT NULL,
  shipping_address_id BIGINT NULL,
  status ENUM('created','pending','paid','failed','cancelled','fulfilled','refunded') NOT NULL DEFAULT 'created',
  currency CHAR(3) NOT NULL DEFAULT 'USD',
  subtotal_cents INT NOT NULL DEFAULT 0,
  discount_cents INT NOT NULL DEFAULT 0,
  shipping_cents INT NOT NULL DEFAULT 0,
  tax_cents INT NOT NULL DEFAULT 0,
  total_cents INT NOT NULL DEFAULT 0,
  shipping_option ENUM('digital','delivery','pickup') NOT NULL DEFAULT 'digital',
  notes TEXT,
  paypal_order_id VARCHAR(191),
  paypal_capture_id VARCHAR(191),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (billing_address_id) REFERENCES addresses(id),
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  format ENUM('ebook','audiobook','paperback') NOT NULL,
  sku VARCHAR(64),
  title_snapshot VARCHAR(191) NOT NULL,
  unit_price_cents INT NOT NULL,
  quantity INT NOT NULL,
  line_total_cents INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  provider ENUM('paypal') NOT NULL,
  status ENUM('created','approved','captured','failed','refunded') NOT NULL,
  amount_cents INT NOT NULL,
  currency CHAR(3) NOT NULL,
  remote_id VARCHAR(191) NOT NULL,
  raw_json JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS downloads (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  format ENUM('ebook','audiobook') NOT NULL,
  file_url VARCHAR(512) NOT NULL,
  download_token CHAR(36) NOT NULL UNIQUE,
  expires_at DATETIME NULL,
  download_count INT NOT NULL DEFAULT 0,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS coupons (
  code VARCHAR(64) PRIMARY KEY,
  type ENUM('percent','fixed') NOT NULL,
  value INT NOT NULL,
  active TINYINT(1) NOT NULL DEFAULT 1,
  max_uses INT NULL,
  used_count INT NOT NULL DEFAULT 0,
  valid_from DATETIME NULL,
  valid_to DATETIME NULL
);

CREATE TABLE IF NOT EXISTS form_submissions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  form_slug VARCHAR(64) NOT NULL,
  email VARCHAR(191) NOT NULL,
  name VARCHAR(191),
  payload JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

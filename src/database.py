import sqlite3

class MerchDatabase:
    def __init__(self, db_file="merch.db"):
        self.conn = sqlite3.connect(db_file)
        self.conn.row_factory = sqlite3.Row  # Returns query results as dictionaries
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
        # 1. Main Products Table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                item TEXT NOT NULL,
                price REAL NOT NULL,
                default_image TEXT NOT NULL,
                description TEXT,
                stock INTEGER DEFAULT 0
            )
        """)

        # 2. Color Variants Table (Linked to products via product_id)
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS product_colors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER,
                name TEXT NOT NULL,
                image TEXT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
        """)
        self.conn.commit()

    def get_all_inventory(self):
        # Fetch products and nest their color variants into JSON for React
        self.cursor.execute("SELECT * FROM products")
        products = [dict(row) for row in self.cursor.fetchall()]

        for product in products:
            self.cursor.execute("SELECT id as key, name, image FROM product_colors WHERE product_id = ?", (product['id'],))
            product['colors'] = [dict(row) for row in self.cursor.fetchall()]

        return products
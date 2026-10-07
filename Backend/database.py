# db.py
import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class ShowsDatabase:
    def __init__(self, db_file=None):
        db_file = db_file or os.path.join(BASE_DIR, "shows.db")
        self.conn = sqlite3.connect(db_file, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATE,
            location TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL
            )
        """)
        self.conn.commit()

    def add_event(self, date, location, city, state):
        self.cursor.execute("""
            INSERT INTO events (date, location, city, state)
            VALUES (?, ?, ?, ?)
        """, (date, location, city, state))
        event_id = self.cursor.lastrowid
        self.conn.commit()
        return event_id

    def delete_events(self, event_ids):
        if not event_ids:
            return 0
        
        placeholders = ', '.join(['?'] * len(event_ids))
        query = f"DELETE FROM events WHERE id IN ({placeholders})"
        self.cursor.execute(query, event_ids)
        deleted_count = self.cursor.rowcount
        self.conn.commit()

        return deleted_count

    def get_all_events(self):
        self.cursor.execute("SELECT * FROM events order by date ASC")
        return [dict(row) for row in self.cursor.fetchall()]


class MerchDatabase:
    def __init__(self, db_file=None):
        db_file = db_file or os.path.join(BASE_DIR, "merch.db")
        self.conn = sqlite3.connect(db_file, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
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

    def add_product(self, item, price, default_image, description, stock, colors=None):
        self.cursor.execute("""
            INSERT INTO products (item, price, default_image, description, stock)
            VALUES (?, ?, ?, ?, ?)
        """, (item, price, default_image, description, stock))
        product_id = self.cursor.lastrowid

        if colors:
            color_rows = [(product_id, name, image) for name, image in colors]
            self.cursor.executemany(
                "INSERT INTO product_colors (product_id, name, image) VALUES (?, ?, ?)",
                color_rows
            )
        self.conn.commit()
        return product_id

    def get_all_inventory(self):
        self.cursor.execute("SELECT * FROM products")
        products = [dict(row) for row in self.cursor.fetchall()]
        for product in products:
            self.cursor.execute("SELECT id as key, name, image FROM product_colors WHERE product_id = ?", (product['id'],))
            product['colors'] = [dict(row) for row in self.cursor.fetchall()]
        return products
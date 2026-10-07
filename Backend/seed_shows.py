from database import ShowsDatabase

# Initialize the database connection (creates shows.db and tables if they don't exist)
shows_db = ShowsDatabase()

# Hardcoded event list
sample_events = [
    {"date": "2024-07-01", "location": "Madison Sq Garden", "city": "NY", "state": "NY"},
    {"date": "2024-07-15", "location": "Savanna Rooftop", "city": "Los Angeles", "state": "CA"},
    {"date": "2024-08-05", "location": "Wriggly Field", "city": "Chicago", "state": "IL"},
    {"date": "2024-08-20", "location": "LC Pavilion", "city": "Columbus", "state": "OH"},
]

# Insert each show into the database
print("Seeding events into database...")
for show in sample_events:
    event_id = shows_db.add_event(
        date=show["date"],
        location=show["location"],
        city=show["city"],
        state=show["state"]
    )
    print(f"Added Event ID {event_id}: {show['date']} at {show['location']}")

print("\nSeeding complete! Run app.py and visit http://127.0.0.1:5000/api/shows to test.")
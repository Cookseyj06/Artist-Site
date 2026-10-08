import { useState } from 'react';
import { useEffect } from 'react';

function Shows() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    fetch('/api/shows')
    .then((res) => res.json())
    .then((data) => {
      setEvents(data);
      setLoading(false);
    })
    .catch((err) => console.error('Error loading events:', err));
    setLoading(false);
  }, []);

  if (loading) return <p>Loading Shows...</p>
  if (events || events.length === 0) { 
    return <p>No Upcoming Shows at this Time</p>
  }
    return (
      <div className="shows-container">
      <ul className="shows-list">
        {events.map((event) => <li className="show-item" key={event.id}>
          <span>{event.date}</span>
          <span>{event.location}</span>
          <span>{event.city}, {event.state}</span>
        </li>)}
      </ul>
      </div>
    )

}

export default Shows;
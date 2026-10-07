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
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <ul style={{fontWeight: 'bold', listStyleType: 'none', gap: '3vw', display: 'flex', flexDirection: 'column'}}>
        {events.map((event) => <li style={{ display: 'grid', gridTemplateColumns: 'minmax(80px, 12vw) minmax(150px, 20vw) minmax(150px, 20vw)', textAlign: 'left' }} key={event.id}>
          <span>{event.date}</span>
          <span>{event.location}</span>
          <span>{event.city}, {event.state}</span>
        </li>)}
      </ul>
      </div>
    )

}

export default Shows;
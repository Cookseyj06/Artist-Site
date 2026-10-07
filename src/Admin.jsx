import { useState } from "react";
import { useEffect } from "react";

function AddMerch() {
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [defaultImage, setDefaultImage] = useState('');
    const [message, setMessage] = useState('');

    const handleProductSubmit = async (e) => {
        e.preventDefault(); 


            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item,
                    price: Number(price),
                    default_image: defaultImage,
                    description,
                    stock: Number(stock)
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Added item #${data.id}`);
                setItem('');
                setPrice('');
                setStock('');
                setDescription('');
                setDefaultImage('');


            } else {
                setMessage(`Error ${data.error}`)
            }
    }

    return (
        <div>
            <form onSubmit={handleProductSubmit}>
                <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Item Name" />
                <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Item Price" />
                <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Inventory" />
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Item Description" />
                <input value={defaultImage} onChange={(e) => setDefaultImage(e.target.value)} placeholder="Enter Item Image" />
                <button type="submit">Add Product</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );


}

function AddShows( {onEventsAdded}) {
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [message, setMessage] = useState('')


    const handleShowSubmit = async (e) => {
        e.preventDefault(); 


            const response = await fetch('/api/shows', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    location,
                    city,
                    state
                })
            });

                const data = await response.json();

            if (response.ok) {
                setMessage(`Added Show`);
                setDate('');
                setLocation('');
                setCity('');
                setState('');
                onEventsAdded?.();

            } else {
                setMessage(`Error ${data.error}`)
            }

    }

    return (
        <div>
            <form onSubmit={handleShowSubmit}>
                <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Venue" />
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                <input value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                <button type="submit">Add Show</button>
                {message && <p>{message}</p>}
            </form>
        </div>

    );


}

function DeleteShows( {events, checked, handleCheckbox, setChecked, onEventsDeleted} ) {
    async function handleDeleteSubmit(e) {
    e.preventDefault();

    const response = await fetch('/api/shows', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: checked })
    });

    const data = await response.json();

    if (response.ok) {
        setChecked([]);          
        onEventsDeleted?.();     
    } else {
        console.error(data.error);
    }

    };
    

    return (
    <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            width: '100%',
            fontWeight: 'bold', 
            listStyleType: 'none', 
            gap: '3vw', 
            flexDirection: 'column' }}>
            <form onSubmit={handleDeleteSubmit}>
                {events.map((event) => (
                    <label key={event.id} 
                        style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '40px minmax(80px, 12vw) minmax(150px, 20vw) minmax(150px, 20vw)', 
                        textAlign: 'left' }}
                    >
                        <input type="checkbox"
                        checked={checked.includes(event.id)} 
                        onChange={() => handleCheckbox(event.id)}/>
                        <span>{event.date}</span>
                        <span>{event.location}</span>
                        <span>{event.city}, {event.state}</span>
                    </label>
                ))}
                <button type="submit">Delete Selected Shows</button>
            </form>
        </div>
    );
}


function Admin() {

    const [events, setEvents] = useState([]);
    const [checked, setChecked] = useState([]);

    const loadEvents = () => {
        fetch('/api/shows')
        .then((res) => res.json())
        .then((data) => setEvents(data))
        .catch((err) => console.error('Error loading events:', err));
    };

    useEffect(() => {
        loadEvents();
    }, []);

    function handleCheckbox(eventId) {
        setChecked((prevChecked) => 
            prevChecked.includes(eventId)
            ? prevChecked.filter((id) => id !== eventId)
            : [...prevChecked, eventId]
        )
    }

    return (
        <div>
            <AddMerch />
            <AddShows onEventsAdded={loadEvents} />
            <DeleteShows events={events} checked={checked} handleCheckbox={handleCheckbox} setChecked={setChecked} onEventsDeleted={loadEvents} />
        </div>


    );
}
//poop

export default Admin;
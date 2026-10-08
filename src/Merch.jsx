import { useState } from 'react';
import { useEffect } from 'react';

function MerchCard({product}) {

    const [currentImage, setCurrentImage] = useState(product.default_image);
    return (
        <article>
            <h2>{product.item}</h2>
            <img className="merch-image" src={currentImage} alt={product.description}/>
            <p></p>
            {product.colors?.map((color) => 
                <button
                    key={color.key}
                    className="merch-color"
                    style={{ backgroundColor: color.name }}
                    onClick={() => setCurrentImage(color.image)}>
                </button>)}
                <p>Price: {product.price}</p>
                <p>Stock: {(product.stock) > 0 ? (product.stock) : "Out of Stock"}</p>
            <button>Add to Cart</button>
        </article>
    );
}

function Merch() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Fetch data from your backend server endpoint
    fetch('/api/inventory')
      .then((res) => res.json())
      .then((data) => {
        setInventory(data);
        setLoading(false);
      })
      .catch((err) => console.error('Error loading inventory:', err));
  }, []);

  if (loading) return <p>Loading Merch...</p>
    return (
        <ul className="merch">
            {inventory.map((product) => <li key={product.id}>
                <MerchCard product={product} />
            </li>)}
        </ul>
    );
}

export default Merch;
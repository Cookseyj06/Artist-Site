import { useState } from "react";

function Contact() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmit(e) {
        e.preventDefault();


            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name,
                  email,
                  description
                })
            });

                const data = await response.json();

            if (response.ok) {
                setMessage(`Message sent!`);
                setName('');
                setEmail('');
                setDescription('');


            } else {
                setMessage(`Error ${data.error}`)
            }
    }

  return ( 
  <div>
  <h1>Contact Alex</h1>
  <div style={{display: 'flex', justifyContent: 'center'}}>
   <form onSubmit={handleSubmit} style={{fontWeight: 'bold', listStyleType: 'none', gap: '1vw', display: 'flex', flexDirection: 'column', width: '35%', height: '100%'}}>
            <input className="contact-form-info" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input className="contact-form-info" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <textarea className="contact-form-message" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Type message here" />
            <button className="contact-button" type="submit">Send</button>
            {message && <p>{message}</p>}
        </form>
        </div>
  </div>
  );
}

export default Contact;
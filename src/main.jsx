import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css'
import Home from './Home';
import Merch from './Merch';
import Admin from './Admin';
import Streaming from './Streaming'
import Shows from './Shows'
import Contact from './Contact'

function Music() {
  return <h1>Music Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
          <header className="header">
            <nav className="nav-bar">
              <Link to="/">Home</Link>
              {/* <Link to="/music">Music</Link> | {" "} */}
              <Link to="/merch">Merch</Link>
              <Link to="/shows">Shows</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </nav>
            </header>
          <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          </main>
      <footer className="footer">
        <p>© Alex Dethero 2026 {" "}</p>
          <Streaming />
      </footer>
    </div>
    </BrowserRouter>
  );
}



createRoot(document.getElementById('root')).render(
    <App />
);

export default App;
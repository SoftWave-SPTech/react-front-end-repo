import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function AppRouter() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the institutional site!</p>
        </div>
    );
}

function About() {
    return (
        <div>
            <h1>About Page</h1>
            <p>Information about the institution.</p>
        </div>
    );
}

function Contact() {
    return (
        <div>
            <h1>Contact Page</h1>
            <p>Contact details go here.</p>
        </div>
    );
}

export default AppRouter;
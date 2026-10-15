import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Properties from './pages/Properties';
import Dashboard from './pages/Dashboard';
import AddProperty from './pages/AddProperty';
import PropertyDetails from './pages/PropertyDetails';
import EditProperty from './pages/EditProperty';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column ui-dark-theme">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/edit-property/:id" element={<EditProperty />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
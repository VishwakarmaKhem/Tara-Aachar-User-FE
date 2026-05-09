import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          🥒 Tara Aachar
        </Link>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/store" className="navbar-link" onClick={closeMenu}>
            Store
          </Link>
          <Link to="/about" className="navbar-link" onClick={closeMenu}>
            Our Story
          </Link>
          <Link to="/contact" className="navbar-link" onClick={closeMenu}>
            Order Now
          </Link>

          {isAuthenticated ? (
            <>
              <span className="navbar-user">👤 {user?.email?.split('@')[0]}</span>
              <button className="navbar-link navbar-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-link navbar-login" onClick={closeMenu}>
              Login
            </Link>
          )}
        </div>

        <div 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
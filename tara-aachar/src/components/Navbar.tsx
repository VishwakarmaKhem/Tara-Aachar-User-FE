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

  const handleNavClick = () => {
    closeMenu();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleNavClick}>
          🥒 Tara Aachar
        </Link>

        {/* Desktop menu */}
        <div className="navbar-menu desktop-menu">
          <Link to="/" className="navbar-link" onClick={handleNavClick}>Home</Link>
          <Link to="/store" className="navbar-link" onClick={handleNavClick}>Store</Link>
          <Link to="/about" className="navbar-link" onClick={handleNavClick}>Our Story</Link>
          <Link to="/contact" className="navbar-link" onClick={handleNavClick}>Order Now</Link>
          {isAuthenticated ? (
            <>
              <span className="navbar-user">👤 {user?.email?.split('@')[0]}</span>
              <button className="navbar-link navbar-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="navbar-link navbar-login" onClick={handleNavClick}>Login</Link>
          )}
        </div>

        {/* Hamburger */}
        <div
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          role="button"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        {/* User profile section */}
        {isAuthenticated ? (
          <div className="mobile-profile">
            <div className="mobile-avatar">👤</div>
            <div className="mobile-profile-info">
              <span className="mobile-profile-name">{user?.email?.split('@')[0]}</span>
              <span className="mobile-profile-email">{user?.email}</span>
            </div>
          </div>
        ) : (
          <div className="mobile-auth-prompt">
            <Link to="/login" className="mobile-login-btn" onClick={handleNavClick}>
              🔑 Login / Sign Up
            </Link>
          </div>
        )}

        <div className="mobile-divider" />

        {/* Nav links */}
        <nav className="mobile-nav">
          <Link to="/" className="mobile-nav-link" onClick={handleNavClick}>
            <span className="mobile-nav-icon">🏠</span> Home
          </Link>
          <Link to="/store" className="mobile-nav-link" onClick={handleNavClick}>
            <span className="mobile-nav-icon">🥒</span> Store
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={handleNavClick}>
            <span className="mobile-nav-icon">📖</span> Our Story
          </Link>
          <Link to="/contact" className="mobile-nav-link" onClick={handleNavClick}>
            <span className="mobile-nav-icon">🛒</span> Order Now
          </Link>
        </nav>

        {/* Logout at bottom */}
        {isAuthenticated && (
          <>
            <div className="mobile-divider" />
            <button className="mobile-logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        )}
      </div>

      {/* Backdrop */}
      {isMenuOpen && <div className="mobile-backdrop" onClick={closeMenu} />}
    </nav>
  );
};

export default Navbar;

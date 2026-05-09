import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">🥒 Tara Aachar</h3>
            <p className="footer-description">
              Authentic homemade pickles crafted with love using traditional family recipes. 
              Bringing you the finest taste of Indian aachar since generations.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="WhatsApp">📱</a>
              <a href="#" className="social-link" aria-label="Instagram">📷</a>
              <a href="#" className="social-link" aria-label="Facebook">👥</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/store">Store</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Order Now</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Our Specialties</h4>
            <ul className="footer-links">
              <li>🥭 Mango Aachar</li>
              <li>🥕 Mixed Vegetable Pickle</li>
              <li>🍋 Lemon Pickle</li>
              <li>🧄 Garlic Pickle</li>
              <li>🌶️ Green Chili Pickle</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📞 +91 98765 43210</p>
              <p>💬 WhatsApp: +91 98765 43210</p>
              <p>📧 orders@tarachar.com</p>
              <p>🚚 Free delivery within 5km</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2026 Tara Aachar. All rights reserved.</p>
            <p>Made with ❤️ for pickle lovers</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
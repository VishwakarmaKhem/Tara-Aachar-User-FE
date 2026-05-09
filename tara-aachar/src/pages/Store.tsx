import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import { getProductsApi, type Product } from '../api/products';
import './Store.css';

// Emoji fallback based on variant
const variantEmoji: Record<string, string> = {
  SPICY: '🌶️',
  TANGY: '🍋',
  MILD: '🥕',
  SWEET: '🥭',
};

const PAGE_SIZE = 10;

// Static preview data shown to guests
const STATIC_PICKLES = [
  { id: 1, title: 'Mango Aachar', price: 250, variant: 'TANGY', emoji: '🥭', ingredients: ['Raw Mango', 'Mustard Oil', 'Spices'] },
  { id: 2, title: 'Green Chili Pickle', price: 130, variant: 'SPICY', emoji: '🌶️', ingredients: ['Green Chili', 'Salt', 'Mustard Seeds'] },
  { id: 3, title: 'Lemon Pickle', price: 200, variant: 'TANGY', emoji: '🍋', ingredients: ['Lemon', 'Turmeric', 'Mustard Oil'] },
  { id: 4, title: 'Carrot Pickle', price: 110, variant: 'MILD', emoji: '🥕', ingredients: ['Carrot', 'Turnip', 'Spice Mix'] },
  { id: 5, title: 'Garlic Pickle', price: 180, variant: 'SPICY', emoji: '🧄', ingredients: ['Garlic', 'Red Chili', 'Mustard Oil'] },
];

const SHOWCASE_ITEMS = [
  { icon: '🌿', title: 'All Natural', desc: 'No preservatives, no artificial colours — just real ingredients.' },
  { icon: '👵', title: 'Family Recipe', desc: 'Passed down through generations, made the traditional way.' },
  { icon: '🚚', title: 'Fresh Delivery', desc: 'Delivered within 24 hours of preparation, sealed for freshness.' },
  { icon: '🌶️', title: 'Every Variant', desc: 'Mild, Tangy, Spicy, Sweet — something for every palate.' },
  { icon: '🏆', title: 'Premium Quality', desc: 'Sourced from local farms, handpicked for the best taste.' },
];

const Store = () => {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const fetchProducts = async (page: number) => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await getProductsApi(token, page, PAGE_SIZE);
      setProducts(result.products);
      setTotalCount(result.totalCount);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pageNo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo, token]);

  const handleBuyNow = (product: Product) => {
    if (isAuthenticated) {
      navigate('/contact', { state: { product } });
    } else {
      setPendingProduct(product);
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (pendingProduct) {
      navigate('/contact', { state: { product: pendingProduct } });
      setPendingProduct(null);
    }
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="store">
      <div className="store-container">
        <div className="store-header">
          <h1>🥒 Our Pickle Store 🥒</h1>
          <p className="store-subtitle">
            Discover our authentic collection of homemade pickles, each crafted with love and traditional recipes
          </p>
        </div>

        {/* ── GUEST VIEW ── */}
        {!isAuthenticated && (
          <>
            {/* Carousel section */}
            <div className="carousel-section">
              <div className="carousel-heading">
                <h2>Our Bestsellers</h2>
                <p>A taste of what's waiting for you</p>
              </div>

              <div className="carousel-wrapper">
                <div className="carousel-track" ref={carouselRef}>
                  {STATIC_PICKLES.map((p) => (
                    <div key={p.id} className="carousel-card">
                      <div className="carousel-card-img">
                        <span>{p.emoji}</span>
                        <div className="carousel-badge">{p.variant}</div>
                      </div>
                      <div className="carousel-card-body">
                        <h3>{p.title}</h3>
                        <div className="carousel-tags">
                          {p.ingredients.map((ing, i) => (
                            <span key={i} className="carousel-tag">{ing}</span>
                          ))}
                        </div>
                        <div className="carousel-price">₹{p.price} <span>/ jar</span></div>
                      </div>
                    </div>
                  ))}

                  {/* See More card */}
                  <div
                    className="carousel-card carousel-see-more"
                    onClick={() => setShowLoginModal(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setShowLoginModal(true)}
                    aria-label="Login to see all products"
                  >
                    <div className="see-more-inner">
                      <span className="see-more-arrow">→</span>
                      <p>See All Pickles</p>
                      <span className="see-more-hint">Login to explore</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Showcase section */}
            <div className="showcase-section">
              <div className="carousel-heading">
                <h2>Why Tara Aachar?</h2>
                <p>Handcrafted with love, delivered with care</p>
              </div>

              <div className="carousel-wrapper">
                <div className="carousel-track" ref={showcaseRef}>
                  {SHOWCASE_ITEMS.map((item, i) => (
                    <div key={i} className="showcase-card">
                      <span className="showcase-icon">{item.icon}</span>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  ))}

                  {/* See More card */}
                  <div
                    className="showcase-card showcase-see-more"
                    onClick={() => setShowLoginModal(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setShowLoginModal(true)}
                    aria-label="Login to see all products"
                  >
                    <div className="see-more-inner">
                      <span className="see-more-arrow">→</span>
                      <p>Explore the Store</p>
                      <span className="see-more-hint">Login to order</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── AUTHENTICATED VIEW ── */}

        {/* Loading state */}
        {isAuthenticated && loading && (
          <div className="store-loading">
            <span className="loading-spinner">🥒</span>
            <p>Loading fresh pickles...</p>
          </div>
        )}

        {/* Error state */}
        {isAuthenticated && !loading && error && (
          <div className="store-error">
            <p>⚠️ {error}</p>
            <button onClick={() => fetchProducts(pageNo)} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {/* Products grid */}
        {isAuthenticated && !loading && !error && (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="product-img"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                          (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <span
                      className="product-emoji"
                      style={{ display: product.imageUrl ? 'none' : 'flex' }}
                    >
                      {variantEmoji[product.variant] || '🥒'}
                    </span>
                    <div className="product-badge">
                      <span>{product.variant}</span>
                    </div>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.title}</h3>
                    <p className="product-description">{product.description}</p>

                    <div className="product-features">
                      {product.ingredients.map((ingredient, index) => (
                        <span key={index} className="feature-tag">
                          {ingredient}
                        </span>
                      ))}
                    </div>

                    <div className="product-details">
                      <div className="product-weight">
                        <span>{product.category}</span>
                      </div>
                      <div className="product-price">
                        <span className="price">₹{product.price}</span>
                        <span className="price-unit">per jar</span>
                      </div>
                    </div>

                    <button
                      className="buy-now-btn"
                      onClick={() => handleBuyNow(product)}
                    >
                      🛒 Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setPageNo((p) => Math.max(0, p - 1))}
                  disabled={pageNo === 0}
                >
                  ← Prev
                </button>
                <span className="page-info">
                  Page {pageNo + 1} of {totalPages}
                </span>
                <button
                  className="page-btn"
                  onClick={() => setPageNo((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={pageNo >= totalPages - 1}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}

        <div className="store-footer">
          <div className="delivery-info">
            <h3>🚚 Delivery Information</h3>
            <div className="delivery-details">
              <p>✅ Free delivery within 5km radius</p>
              <p>✅ ₹50 delivery charge for longer distances</p>
              <p>✅ Fresh pickles delivered within 24 hours</p>
              <p>✅ Secure packaging to maintain freshness</p>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => { setShowLoginModal(false); setPendingProduct(null); }}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Store;

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginApi, signupApi } from '../api/auth';
import './LoginModal.css';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal = ({ onClose, onSuccess }: LoginModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data =
        mode === 'login'
          ? await loginApi({ email, password })
          : await signupApi({ email, password, phoneNumber: Number(phoneNumber) });

      login(data.token, data.user);
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close login dialog">✕</button>

        <div className="modal-header">
          <span className="modal-icon">🥒</span>
          <h2 id="modal-title">
            {mode === 'login' ? 'Login to continue' : 'Create an account'}
          </h2>
          <p>You need to be logged in to place an order</p>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); }}
            type="button"
          >
            Login
          </button>
          <button
            className={`tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); setError(''); }}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="modal-email">Email Address</label>
            <input
              id="modal-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="modal-password">Password</label>
            <input
              id="modal-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="modal-phone">Phone Number</label>
              <input
                id="modal-phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. 9876543210"
                required
                autoComplete="tel"
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
              />
            </div>
          )}

          {error && <p className="modal-error" role="alert">{error}</p>}

          <button type="submit" className="modal-submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? '🔑 Login' : '🚀 Create Account'}
          </button>
        </form>

        <p className="modal-switch">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            className="switch-link"
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

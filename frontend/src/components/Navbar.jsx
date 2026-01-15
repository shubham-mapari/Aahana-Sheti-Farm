import React from 'react';
import { logoutAdmin } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("बाहेर पडायचे आहे का? (Logout?)")) {
      await logoutAdmin();
      navigate('/login');
    }
  };

  return (
    <div className="top-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="nav-profile-block">
        <span className="admin-badge">Admin</span>
        <button
          onClick={handleLogout}
          className="logout-minimal"
        >
          Logout 🚪
        </button>
      </div>

      <style>{`
        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 0.8rem 0;
          border-bottom: 1px solid #edf2f7;
        }

        .page-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--secondary-charcoal);
        }

        @media (max-width: 600px) {
          .page-title { font-size: 1.1rem; }
          .top-bar { margin-bottom: 1rem; }
        }

        .nav-profile-block {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .admin-badge {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 0.3rem 0.8rem;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .logout-minimal {
          background: none;
          color: #ff5252;
          font-weight: 600;
          font-size: 0.95rem;
          transition: opacity 0.2s;
        }

        .logout-minimal:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default Navbar;

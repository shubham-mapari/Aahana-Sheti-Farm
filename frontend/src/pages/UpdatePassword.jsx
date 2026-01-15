import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../firebase/auth';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('पासवर्ड जुळत नाहीत (Passwords do not match)');
            return;
        }

        setLoading(true);
        try {
            await updatePassword(password);
            alert('पासवर्ड यशस्वीरित्या अपडेट केला आहे! आता तुम्ही नवीन पासवर्डने लॉगिन करू शकता.');
            navigate('/login');
        } catch (err) {
            setError('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo-wrap">
                    <img src={process.env.PUBLIC_URL + '/assets/logo.jpg'} alt="Logo" />
                </div>

                <h2 className="login-title">नवीन पासवर्ड सेट करा</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>
                    तुमचा नवीन सुरक्षित पासवर्ड प्रविष्ट करा.
                </p>

                {error && <p className="error-msg">{error}</p>}

                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>नवीन पासवर्ड (New Password)</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <label>पासवर्डची पुष्टी करा (Confirm Password)</label>
                        <input
                            type="password"
                            className="input-field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'अपडेट होत आहे...' : 'पासवर्ड जतन करा'}
                    </button>
                </form>
            </div>

            <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          padding: 1.5rem;
        }
        .login-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 400px;
        }
        .login-logo-wrap {
          width: 70px;
          height: 70px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #f1f5f9;
        }
        .login-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .login-title { text-align: center; margin-bottom: 2rem; color: #1e293b; font-size: 1.5rem; font-weight: 800; }
        .error-msg { color: #ef4444; background: #fee2e2; padding: 0.75rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #475569; }
        .login-btn { width: 100%; background: #2e7d32; color: white; border: none; padding: 0.8rem; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 1rem; }
      `}</style>
        </div>
    );
};

export default UpdatePassword;

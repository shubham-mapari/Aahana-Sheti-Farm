import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin, resetPassword } from '../firebase/auth';
import '../styles/main.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await loginAdmin(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('चुकीचा ई-मेल किंवा पासवर्ड (Invalid credentials)');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await resetPassword(resetEmail);
            alert('पासवर्ड रिसेट करण्याची लिंक तुमच्या ईमेलवर पाठवली आहे.');
            setShowReset(false);
        } catch (err) {
            alert('Error: ' + err.message);
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

                {!showReset ? (
                    <>
                        <h2 className="login-title">Admin Login</h2>
                        {error && <p className="error-msg">{error}</p>}

                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@aahana.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-btn" disabled={loading}>
                                {loading ? 'प्रतीक्षा करा...' : 'Login'}
                            </button>
                        </form>
                        <button className="forgot-link" onClick={() => setShowReset(true)}>
                            पासवर्ड विसरलात? (Forgot Password?)
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="login-title">Reset Password</h2>
                        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem' }}>
                            तुमचा ईमेल टाका, आम्ही तुम्हाला लिंक पाठवू.
                        </p>
                        <form onSubmit={handleResetPassword}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-btn" disabled={loading}>
                                लिंक पाठवा
                            </button>
                        </form>
                        <button className="forgot-link" onClick={() => setShowReset(false)}>
                            परत लॉगिन कडे जा
                        </button>
                    </>
                )}
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
        .login-title { text-align: center; margin-bottom: 2rem; color: #1e293b; font-size: 1.75rem; font-weight: 800; }
        .error-msg { color: #ef4444; background: #fee2e2; padding: 0.75rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem; font-size: 0.9rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #475569; }
        .login-btn { width: 100%; background: #2e7d32; color: white; border: none; padding: 0.8rem; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 1rem; }
        .forgot-link { background: none; border: none; color: #2e7d32; width: 100%; margin-top: 1.5rem; font-weight: 600; cursor: pointer; }
      `}</style>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { supabase } from '../firebase/supabaseClient';

const ManageAdmins = () => {
    const [inviteEmail, setInviteEmail] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleInvite = async (e) => {
        e.preventDefault();
        setMessage({ text: 'लिंक पाठवत आहे...', type: 'info' });

        try {
            if (!supabase) throw new Error("Supabase not connected");
            const { error } = await supabase.auth.admin.inviteUserByEmail(inviteEmail);
            if (error) throw error;

            setMessage({ text: 'आमंत्रण ईमेल यशस्वीरित्या पाठवला गेला आहे!', type: 'success' });
            setInviteEmail('');
        } catch (err) {
            setMessage({
                text: 'आमंत्रण पाठवण्यासाठी Supabase Dashboard मधून "Authentication > Users > Add User" वापरा.',
                type: 'error'
            });
            console.error(err);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar title="Manage Admins" />

                <div className="container-fluid" style={{ maxWidth: '800px' }}>
                    <div className="card premium-card">
                        <h3>👥 नवीन ॲडमिन जोडा (Add New Admin)</h3>
                        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
                            दुसऱ्या व्यक्तीला ॲडमिन बनवण्यासाठी त्यांचा ईमेल टाका. त्यांना ईमेलवर पासवर्ड सेट करण्याची लिंक मिळेल.
                        </p>

                        {message.text && (
                            <div className={`alert ${message.type}`} style={{
                                padding: '1rem',
                                borderRadius: '10px',
                                marginBottom: '1.5rem',
                                backgroundColor: message.type === 'success' ? '#dcfce7' : message.type === 'info' ? '#dbeafe' : '#fee2e2',
                                color: message.type === 'success' ? '#166534' : message.type === 'info' ? '#1e40af' : '#991b1b',
                                fontWeight: '600'
                            }}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleInvite}>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="example@gmail.com"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ marginTop: '1.5rem', width: '100%' }}
                            >
                                आमंत्रण पाठवा (Send Invite)
                            </button>
                        </form>
                    </div>

                    <div className="card" style={{ marginTop: '2rem', borderLeft: '5px solid var(--accent-gold)' }}>
                        <h4>💡 महत्वाची सूचना</h4>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            <li>ॲडमिनला पूर्ण प्रवेश (Full Access) मिळेल.</li>
                            <li>सुरक्षेसाठी फक्त तुमच्या विश्वासातील व्यक्तीलाच जोडा.</li>
                            <li>जर वरील फॉर्म काम करत नसेल, तर तुमच्या Supabase पॅनेल मधून युजर जोडा.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAdmins;

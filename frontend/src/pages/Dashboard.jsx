import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { getAllFarmers } from '../services/farmerService';
import { fetchAllWorks } from '../services/workService';
import { addData } from '../firebase/firestore';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ farmers: 0, works: 0, totalAmount: 0 });
    const [recentWorks, setRecentWorks] = useState([]);
    const [showQuickAdd, setShowQuickAdd] = useState(false);
    const [newFarmer, setNewFarmer] = useState({ name: '', phone: '', location: '' });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [farmers, works] = await Promise.all([
                getAllFarmers(),
                fetchAllWorks()
            ]);

            const total = works.reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0);

            setStats({
                farmers: farmers.length,
                works: works.length,
                totalAmount: total
            });

            setRecentWorks(works.slice(0, 5));
        } catch (error) {
            console.error("Error loading stats", error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickAdd = async (e) => {
        e.preventDefault();
        if (!newFarmer.name) return;

        setIsSaving(true);
        try {
            await addData('farmers', newFarmer);
            setNewFarmer({ name: '', phone: '', location: '' });
            setShowQuickAdd(false);
            await loadData(); // Refresh stats
            alert('शेतकरी यशस्वीरित्या जोडला गेला!');
        } catch (error) {
            alert('Error: ' + (error.message || 'काहीतरी चूक झाली'));
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar title="Dashboard" />

                {/* Statistics Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-label">एकूण शेतकरी (Farmers)</span>
                        <span className="stat-value">{stats.farmers}</span>
                        <div style={{ marginTop: '10px', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}>
                            <div style={{ width: '70%', height: '100%', background: 'var(--primary-green)', borderRadius: '2px' }}></div>
                        </div>
                    </div>
                    <div className="stat-card" style={{ borderLeftColor: '#ffd600' }}>
                        <span className="stat-label">एकूण कामे (Total Works)</span>
                        <span className="stat-value">{stats.works}</span>
                        <div style={{ marginTop: '10px', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}>
                            <div style={{ width: '45%', height: '100%', background: '#ffd600', borderRadius: '2px' }}></div>
                        </div>
                    </div>
                    <div className="stat-card" style={{ borderLeftColor: '#22c55e' }}>
                        <span className="stat-label">एकूण रक्कम (Total Earnings)</span>
                        <span className="stat-value">₹ {stats.totalAmount.toLocaleString()}</span>
                        <div style={{ marginTop: '10px', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}>
                            <div style={{ width: '85%', height: '100%', background: '#22c55e', borderRadius: '2px' }}></div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    {/* Recent Activity Table */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.5rem' }}>🕒</span> अलीकडील कामे
                            </h3>
                            <Link to="/add-work" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>+ नवीन काम</Link>
                        </div>

                        {recentWorks.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                <p>अद्याप कोणतीही कामे नाहीत. प्रथम काम नोंदवा!</p>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>तारीख</th>
                                            <th>कामाचा प्रकार</th>
                                            <th>रक्कम</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentWorks.map(work => (
                                            <tr key={work.id}>
                                                <td style={{ fontWeight: '600' }}>{new Date(work.date).toLocaleDateString()}</td>
                                                <td>
                                                    <span style={{ background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px', fontSize: '0.9rem' }}>
                                                        {work.work_type}
                                                    </span>
                                                </td>
                                                <td style={{ color: 'var(--primary-green)', fontWeight: '700' }}>₹ {work.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Quick Action & Farmer Add */}
                    <div className="right-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card" style={{ background: 'linear-gradient(135deg, #2e7d32, #1b5e20)', color: 'white' }}>
                            <h3 style={{ marginBottom: '1rem' }}>🚜 शेती व्यवस्थापन</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '1.5rem' }}>
                                येथून तुम्ही त्वरित नवीन शेतकरी जोडू शकता किंवा सर्व यादी पाहू शकता.
                            </p>
                            <button
                                className="btn-primary"
                                style={{ background: 'var(--accent-gold)', color: 'black', width: '100%', marginBottom: '10px' }}
                                onClick={() => setShowQuickAdd(!showQuickAdd)}
                            >
                                {showQuickAdd ? '✕ रद्द करा' : '+ नवीन शेतकरी जोडा'}
                            </button>
                            <Link to="/search-farmer" className="btn-primary" style={{ background: 'rgba(255,255,255,0.2)', width: '100%', border: '1px solid rgba(255,255,255,0.3)' }}>
                                सर्व शेतकरी पहा
                            </Link>
                        </div>

                        {showQuickAdd && (
                            <div className="card animate-fade-in" style={{ border: '2px solid var(--primary-green)' }}>
                                <h4 style={{ marginBottom: '1rem' }}>👤 त्वरित शेतकरी नोंदणी</h4>
                                <form onSubmit={handleQuickAdd}>
                                    <div className="mb-3">
                                        <input
                                            className="input-field"
                                            placeholder="शेतकऱ्याचे नाव"
                                            required
                                            value={newFarmer.name}
                                            onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3" style={{ marginTop: '10px' }}>
                                        <input
                                            className="input-field"
                                            placeholder="फोन नंबर"
                                            value={newFarmer.phone}
                                            onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3" style={{ marginTop: '10px', marginBottom: '15px' }}>
                                        <input
                                            className="input-field"
                                            placeholder="गाव / पत्ता"
                                            value={newFarmer.location}
                                            onChange={(e) => setNewFarmer({ ...newFarmer, location: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={isSaving}>
                                        {isSaving ? 'जतन होत आहे...' : '✅ शेतकरी जतन करा'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .mb-3 { margin-bottom: 0.5rem; }
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 1100px) {
          .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    );
};

export default Dashboard;

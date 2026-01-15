import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { getFarmerDetails } from '../services/farmerService';
import { fetchAllWorks } from '../services/workService';
import { deleteData } from '../firebase/firestore';
import Loader from '../components/Loader';

const FarmerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [farmer, setFarmer] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [farmerData, allWorks] = await Promise.all([
                    getFarmerDetails(id),
                    fetchAllWorks()
                ]);

                setFarmer(farmerData);
                const farmerHistory = allWorks.filter(w => w.farmer_id === id);
                setHistory(farmerHistory);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const refreshData = async () => {
        try {
            const allWorks = await fetchAllWorks();
            const farmerHistory = allWorks.filter(w => w.farmer_id === id);
            setHistory(farmerHistory);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteWork = async (workId) => {
        if (window.confirm("हे काम कायमचे हटवायचे आहे का? (Delete this work?)")) {
            try {
                await deleteData('work_logs', workId);
                alert('काम यशस्वीरित्या हटवले गेले!');
                refreshData(); // Refresh list
            } catch (error) {
                alert('हटवताना त्रुटी आली');
            }
        }
    };

    const handleDeleteFarmer = async () => {
        if (window.confirm("🚨 सावधान! या शेतकऱ्याची संपूर्ण माहिती आणि इतिहास कायमचा हटवला जाईल. सुरू ठेवायचे?")) {
            try {
                // First delete their work logs
                for (const work of history) {
                    await deleteData('work_logs', work.id);
                }
                // Then delete farmer
                await deleteData('farmers', id);
                alert('शेतकरी यशस्वीरित्या हटवला गेला!');
                navigate('/search-farmer');
            } catch (error) {
                alert('हटवताना त्रुटी आली');
            }
        }
    };

    if (loading) return <Loader />;
    if (!farmer) return <div className="dashboard-layout"><div className="main-content">शेतकरी सापडला नाही</div></div>;

    const totalSpent = history.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar title="शेतकरी तपशील" />

                <div className="farmer-profile-card card">
                    <div className="profile-header">
                        <div className="profile-avatar">{farmer.name[0]}</div>
                        <div className="profile-info">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <h2>{farmer.name}</h2>
                                <button
                                    onClick={handleDeleteFarmer}
                                    style={{ background: '#fee2e2', border: 'none', color: '#dc2626', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}
                                >
                                    🗑️ शेतकरी हटवा
                                </button>
                            </div>
                            <p>📍 {farmer.location || 'पत्ता उपलब्ध नाही'}</p>
                            <p>📞 {farmer.phone || 'फोन उपलब्ध नाही'}</p>
                        </div>
                        <div className="profile-stats">
                            <div className="stat-box">
                                <small>एकूण कामे</small>
                                <strong>{history.length}</strong>
                            </div>
                            <div className="stat-box">
                                <small>एकूण रक्कम</small>
                                <strong>₹ {totalSpent.toLocaleString()}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ marginTop: '2rem' }}>
                    <h3>📜 कामाचा इतिहास (Work History)</h3>

                    {history.length === 0 ? (
                        <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>अद्याप कोणताही इतिहास उपलब्ध नाही.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>तारीख</th>
                                        <th>कामाचा प्रकार</th>
                                        <th>रक्कम</th>
                                        <th>वर्णन</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map(item => (
                                        <tr key={item.id}>
                                            <td>{new Date(item.date).toLocaleDateString()}</td>
                                            <td><span className="badge">{item.work_type}</span></td>
                                            <td className="amount-cell">₹ {item.amount}</td>
                                            <td>{item.description || '-'}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleDeleteWork(item.id)}
                                                    style={{ background: 'none', border: 'none', color: '#ff7675', cursor: 'pointer', fontSize: '1.2rem' }}
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .profile-header { display: flex; align-items: center; gap: 2rem; }
        .profile-avatar { width: 80px; height: 80px; background: var(--primary-green); color: white; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: 700; }
        .profile-info { flex: 1; }
        .profile-info h2 { margin: 0; color: var(--secondary-charcoal); }
        .profile-info p { margin: 5px 0 0; color: var(--text-muted); }
        .profile-stats { display: flex; gap: 1.5rem; }
        .stat-box { background: #f8fafc; padding: 1rem 1.5rem; border-radius: 12px; text-align: center; min-width: 120px; }
        .stat-box small { display: block; color: var(--text-muted); margin-bottom: 5px; }
        .stat-box strong { font-size: 1.25rem; color: var(--primary-green); }
        .history-table { width: 100%; margin-top: 1.5rem; border-collapse: collapse; }
        .history-table th { text-align: left; padding: 1rem; border-bottom: 2px solid #edf2f7; color: var(--text-muted); font-size: 0.9rem; }
        .history-table td { padding: 1rem; border-bottom: 1px solid #edf2f7; }
        .badge { background: #e8f5e9; color: #2e7d32; padding: 0.4rem 0.8rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600; }
        .amount-cell { font-weight: 700; color: var(--secondary-charcoal); }
        @media (max-width: 768px) {
          .profile-header { flex-direction: column; text-align: center; }
          .profile-stats { width: 100%; justify-content: center; margin-top: 1rem; }
          .history-table { min-width: 600px; }
        }
      `}</style>
        </div>
    );
};

export default FarmerDetails;

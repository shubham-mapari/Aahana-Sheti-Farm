import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { searchFarmers, getAllFarmers } from '../services/farmerService';
import { addData } from '../firebase/firestore'; // Using directly for quick farmer add
import { Link } from 'react-router-dom';

const SearchFarmer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [newFarmer, setNewFarmer] = useState({
        name: '',
        phone: '',
        location: ''
    });

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        setSearching(true);
        try {
            const data = await getAllFarmers();
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setSearching(false);
        }
    };

    const handleSearch = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.length > 0) {
            const filtered = await searchFarmers(term);
            setResults(filtered);
        } else {
            loadAll();
        }
    };

    const handleAddFarmer = async (e) => {
        e.preventDefault();
        try {
            await addData('farmers', newFarmer);
            alert('शेतकरी यशस्वीरित्या जोडला गेला!');
            setNewFarmer({ name: '', phone: '', location: '' });
            setShowAddModal(false);
            loadAll();
        } catch (error) {
            alert('Error: ' + (error.message || 'त्रुटी आली'));
            console.error(error);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar title="शेतकरी व्यवस्थापन" />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ flex: 1, marginRight: '1rem' }}>
                        <input
                            type="text"
                            placeholder="🔍 नाव किंवा फोन नंबरने शोधा..."
                            className="input-field"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ minWidth: 'auto', padding: '0.8rem 1.5rem', background: 'var(--primary-green)' }}
                        onClick={() => setShowAddModal(true)}
                    >
                        + नवीन शेतकरी
                    </button>
                </div>

                {showAddModal && (
                    <div className="modal-overlay">
                        <div className="modal-content card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h3>👤 नवीन शेतकरी जोडा</h3>
                                <button onClick={() => setShowAddModal(false)} style={{ background: 'none', fontSize: '1.5rem' }}>✕</button>
                            </div>
                            <form onSubmit={handleAddFarmer}>
                                <div className="mb-3">
                                    <label>पूर्ण नाव (Full Name)</label>
                                    <input
                                        className="input-field"
                                        required
                                        value={newFarmer.name}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>फोन नंबर (Phone)</label>
                                    <input
                                        className="input-field"
                                        value={newFarmer.phone}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>गाव / पत्ता (Location)</label>
                                    <input
                                        className="input-field"
                                        value={newFarmer.location}
                                        onChange={(e) => setNewFarmer({ ...newFarmer, location: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'var(--primary-green)' }}>
                                    जतन करा
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="results-grid">
                    {searching && <p>लोड होत आहे...</p>}

                    {!searching && results.length === 0 && (
                        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                            <p>कोणताही शेतकरी सापडला नाही.</p>
                        </div>
                    )}

                    {results.map(farmer => (
                        <Link to={`/farmer/${farmer.id}`} key={farmer.id} style={{ textDecoration: 'none' }}>
                            <div className="card farmer-item-card">
                                <div className="farmer-avatar">
                                    {farmer.name ? farmer.name[0] : '?'}
                                </div>
                                <div className="farmer-info">
                                    <h4>{farmer.name}</h4>
                                    <p>{farmer.location || 'पत्ता नाही'} | {farmer.phone || 'फोन नाही'}</p>
                                </div>
                                <div className="arrow">❯</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style>{`
        .results-grid {
          display: grid;
          gap: 1rem;
        }

        .farmer-item-card {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          transition: all 0.2s;
        }

        .farmer-item-card:hover {
          border-left: 5px solid var(--primary-green);
          transform: translateX(5px);
        }

        .farmer-avatar {
          width: 50px;
          height: 50px;
          background: #e8f5e9;
          color: var(--primary-green);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          margin-right: 1.5rem;
        }

        .farmer-info { flex: 1; }
        .farmer-info h4 { margin: 0; font-size: 1.1rem; }
        .farmer-info p { margin: 0; color: var(--text-muted); font-size: 0.9rem; }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .modal-content {
          width: 90%;
          max-width: 500px;
          padding: 2.5rem;
        }

        .mb-3 { margin-bottom: 1rem; }
      `}</style>
        </div>
    );
};

export default SearchFarmer;

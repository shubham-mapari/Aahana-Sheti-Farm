import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AddButton from '../components/AddButton';
import { addWork } from '../services/workService';
import { getAllFarmers } from '../services/farmerService';
import { useNavigate } from 'react-router-dom';

const AddWork = () => {
    const navigate = useNavigate();
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        farmer_id: '',
        work_type: 'नांगरणी (Ploughing)',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        description: ''
    });

    const tractorServices = [
        "नांगरणी (Ploughing)",
        "डिस्क हॅरो करणे (Disc Harrowing)",
        "रोटावेटर (Rotavator)",
        "मशागत करणे (Field Prep)",
        "पेरणी (Sowing)",
        "बीज टाकणे (Seed Broadcasting)",
        "खत टाकणे (Fertilizer)",
        "फवारणी (Spraying)",
        "आंतर मशागत (Intercultivation)",
        "बेड तयार करणे (Bed Making)",
        "मल्चिंग करणे (Mulching)",
        "ड्रीप लाईन टाकणे (Drip Line)"
    ];

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const data = await getAllFarmers();
                setFarmers(data);
            } catch (error) {
                console.error("Error fetching farmers", error);
            }
        };
        fetchFarmers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.farmer_id) {
            alert("कृपया शेतकरी निवडा");
            return;
        }
        setLoading(true);
        try {
            await addWork(formData);
            alert('काम यशस्वीरित्या जोडले गेले!');
            navigate('/dashboard');
        } catch (error) {
            alert('काम जोडताना त्रुटी आली');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Navbar title="नवीन काम जोडा" />

                <div className="container-fluid" style={{ maxWidth: '800px' }}>
                    <div className="card premium-card">
                        <h3 style={{ marginBottom: '2rem', color: 'var(--primary-green)' }}>🌾 कामाची माहिती भरा</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <label className="form-label">शेतकरी निवडा (Select Farmer)</label>
                                <select
                                    name="farmer_id"
                                    className="input-field"
                                    value={formData.farmer_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- शेतकरी निवडा --</option>
                                    {farmers.map(f => (
                                        <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
                                    ))}
                                </select>
                                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                                    * जास्तीचे शेतकरी जोडण्यासाठी 'शेतकरी शोधा' मधील पर्याय वापरा.
                                </p>
                            </div>

                            <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group mb-4">
                                    <label className="form-label">कामाचा प्रकार (Work Type)</label>
                                    <select
                                        name="work_type"
                                        className="input-field"
                                        value={formData.work_type}
                                        onChange={handleChange}
                                    >
                                        {tractorServices.map(service => (
                                            <option key={service} value={service}>{service}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-4">
                                    <label className="form-label">तारीख (Date)</label>
                                    <input
                                        type="date"
                                        name="date"
                                        className="input-field"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label">रक्कम (Amount - ₹)</label>
                                <input
                                    type="number"
                                    name="amount"
                                    className="input-field"
                                    placeholder="₹ 0.00"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label">अधिक माहिती (Description)</label>
                                <textarea
                                    name="description"
                                    className="input-field"
                                    rows="3"
                                    placeholder="कामाबद्दल अतिरिक्त माहिती लिहिण्यासाठी..."
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <AddButton
                                    type="submit"
                                    text={loading ? "जतन करत आहे..." : "✅ काम जतन करा"}
                                    disabled={loading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
        .premium-card {
          border: none;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          padding: 2.5rem;
          background: #fff;
        }

        .form-label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--secondary-charcoal);
        }

        .mb-4 { margin-bottom: 1.5rem; }

        @media (max-width: 600px) {
          .row { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
        </div>
    );
};

export default AddWork;

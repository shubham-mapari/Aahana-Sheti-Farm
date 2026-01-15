import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const servicesList = [
        { id: 1, name: "नांगरणी (Ploughing)", icon: "🚜" },
        { id: 2, name: "डिस्क हॅरो करणे (Disc Harrowing)", icon: "⚙️" },
        { id: 3, name: "रोटावेटर (Rotavator)", icon: "🔄" },
        { id: 4, name: "मशागत करणे (Field Prep)", icon: "🌱" },
        { id: 5, name: "पेरणी (Sowing)", icon: "🌾" },
        { id: 6, name: "बीज टाकणे (Seed Broadcasting)", icon: "🧺" },
        { id: 7, name: "खत टाकणे (Fertilizer)", icon: "🧪" },
        { id: 8, name: "फवारणी (Spraying)", icon: "💨" },
        { id: 9, name: "आंतर मशागत (Intercultivation)", icon: "🌿" },
        { id: 10, name: "बेड तयार करणे (Bed Making)", icon: "🏗️" },
        { id: 11, name: "मल्चिंग करणे (Mulching)", icon: "🎞️" },
        { id: 12, name: "ड्रीप लाईन टाकणे (Drip Line)", icon: "💧" }
    ];

    return (
        <div className="home-wrapper">
            {/* Navigation */}
            <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
                <div className="nav-container">
                    <div className="logo-section">
                        <div className="logo-img-wrapper">
                            <img src={process.env.PUBLIC_URL + '/assets/logo.jpg'} alt="Aahana Sheti Farm Logo" className="logo-img" />
                        </div>
                        <span className="logo-brand">आहाना शेती फार्म</span>
                    </div>

                    <div className={`nav-links-container ${isMenuOpen ? 'mobile-show' : ''}`}>
                        <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
                        <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
                        <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
                        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                        <Link to="/login" className="admin-login-btn" onClick={() => setIsMenuOpen(false)}>Admin Login</Link>
                    </div>

                    <button className="mobile-menu-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header id="home" className="hero-section">
                <div className="hero-overlay"></div>
                <img src={process.env.PUBLIC_URL + '/assets/hero-bg.jpg'} alt="Tractor background" className="hero-bg-img" />
                <div className="hero-content">
                    <h1 className="hero-title animate-up">शेतकऱ्यांचा विश्वास, आधुनिक शेतीची ताकद</h1>
                    <p className="hero-subtitle animate-up delay-1">ट्रॅक्टर व शेतीची सर्व कामे – योग्य दरात, हमखास सेवा</p>
                    <div className="hero-cta-groups animate-up delay-2">
                        <a href="#services" className="btn btn-primary">आमच्या सेवा</a>
                        <a href="#contact" className="btn btn-gold">संपर्क करा</a>
                    </div>
                </div>
            </header>

            {/* Advanced Services Section */}
            <section id="services" className="services-section">
                <div className="container">
                    <h2 className="section-title">🚜 आमच्या सेवा</h2>
                    <div className="services-grid">
                        {servicesList.map(service => (
                            <div key={service.id} className="service-card-mini">
                                <div className="mini-icon">{service.icon}</div>
                                <h4>{service.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-us-section">
                <div className="container">
                    <h2 className="section-title white-text">आम्हाला का निवडावे?</h2>
                    <div className="why-us-grid">
                        <div className="why-card">
                            <span className="check-icon">✔</span>
                            <p>पारदर्शक व्यवहार</p>
                        </div>
                        <div className="why-card">
                            <span className="check-icon">✔</span>
                            <p>अनुभवी चालक</p>
                        </div>
                        <div className="why-card">
                            <span className="check-icon">✔</span>
                            <p>योग्य दर</p>
                        </div>
                        <div className="why-card">
                            <span className="check-icon">✔</span>
                            <p>शेतकऱ्यांचा विश्वास</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Photo Gallery Section */}
            <section id="gallery" className="gallery-section">
                <div className="container">
                    <h2 className="section-title">आमचा फोटो अल्बम</h2>
                    <div className="gallery-grid">
                        <div className="gallery-item"><img src={process.env.PUBLIC_URL + '/assets/tractor1.jpg'} alt="Work 1" /></div>
                        <div className="gallery-item"><img src={process.env.PUBLIC_URL + '/assets/tractor2.jpg'} alt="Work 2" /></div>
                        <div className="gallery-item"><img src={process.env.PUBLIC_URL + '/assets/tractor3.jpg'} alt="Work 3" /></div>
                        <div className="gallery-item"><img src={process.env.PUBLIC_URL + '/assets/tractor4.jpg'} alt="Work 4" /></div>
                        <div className="gallery-item"><img src={process.env.PUBLIC_URL + '/assets/tractor5.jpg'} alt="Work 5" /></div>
                        <div className="gallery-item"><img src={process.env.PUBLIC_URL + '/assets/tractor6.jpg'} alt="Work 6" /></div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <a href="https://www.instagram.com/aahana_sheti_farm" target="_blank" rel="noreferrer" className="insta-link">
                            📸 Follow on Instagram: @aahana_sheti_farm
                        </a>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="container">
                    <h2 className="section-title">संपर्क करा</h2>
                    <div className="contact-card">
                        <div className="contact-info">
                            <h3>आहाना शेती फार्म</h3>
                            <p className="owner-names">विपुल खुटाळे / विलास खुटाळे</p>

                            <div className="contact-item">
                                <span className="icon">📞</span>
                                <a href="tel:+917517622126">+91 75176 22126</a>
                            </div>
                            <div className="contact-item">
                                <span className="icon">📞</span>
                                <a href="tel:+919822509550">+91 98225 09550</a>
                            </div>

                            <a href="https://wa.me/917517622126" className="whatsapp-btn">
                                <span className="wa-icon">💬</span> WhatsApp वर चॅट करा
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="main-footer">
                <div className="footer-logo-wrap">
                    <img src={process.env.PUBLIC_URL + '/assets/logo.jpg'} alt="Logo small" className="footer-logo" />
                </div>
                <p>&copy; 2026 आहाना शेती फार्म. सर्व हक्क राखीव.</p>
            </footer>


            <style>{`
        :root {
          --primary-green: #2e7d32;
          --secondary-charcoal: #263238;
          --accent-gold: #ffd600;
          --bg-light: #f5f5f5;
          --white: #ffffff;
        }

        .home-wrapper {
          font-family: 'Outfit', 'Noto Sans Marathi', sans-serif;
          color: var(--secondary-charcoal);
          background-color: var(--white);
          overflow-x: hidden;
        }

        .container {
          padding: 0 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          padding: 1rem 0;
          transition: all 0.3s ease;
          background: transparent;
        }

        .nav-scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          backdrop-filter: blur(10px);
          padding: 0.75rem 0;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.5rem;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-img-wrapper {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--primary-green);
        }

        .logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .logo-brand {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary-green);
        }

        .navbar:not(.nav-scrolled) .logo-brand {
          color: white;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
        }

        .nav-links-container {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links-container a {
          color: inherit;
          font-weight: 500;
          transition: color 0.3s;
          text-decoration: none;
        }

        .navbar:not(.nav-scrolled) .nav-links-container a {
          color: white;
        }

        .admin-login-btn {
          background: var(--primary-green);
          color: white !important;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          text-decoration: none;
        }

        /* Mobile Navbar */
        @media (max-width: 768px) {
          .nav-links-container {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }

          .nav-links-container.mobile-show {
            display: flex;
          }

          .nav-links-container a {
            color: var(--secondary-charcoal) !important;
            font-size: 1.25rem;
            padding: 1rem;
          }

          .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--primary-green);
          }
          
          .navbar:not(.nav-scrolled) .mobile-menu-toggle {
            color: white;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-toggle { display: none; }
        }

        /* Hero */
        .hero-section {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #000;
        }

        .hero-bg-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center bottom;
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5));
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          color: white;
          padding: 0 1rem;
          max-width: 800px;
        }

        .hero-title {
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 4vw, 1.5rem);
          margin-bottom: 2.5rem;
          opacity: 0.9;
        }

        .hero-cta-groups {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s;
          display: inline-block;
          text-decoration: none;
          min-width: 180px;
          cursor: pointer;
        }

        .btn-primary {
          background: var(--primary-green);
          color: white;
        }

        .btn-gold {
          background: var(--accent-gold);
          color: var(--secondary-charcoal);
        }

        /* Services Grid */
        .services-section { padding: 5rem 0; background: var(--bg-light); }
        .section-title { text-align: center; color: var(--primary-green); margin-bottom: 3rem; font-size: 2.5rem; }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .service-card-mini {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }

        .service-card-mini:hover {
          transform: translateY(-5px);
          border: 1px solid var(--primary-green);
        }

        .mini-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .service-card-mini h4 { font-size: 1.1rem; color: var(--secondary-charcoal); }

        /* Gallery */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
        .gallery-item { aspect-ratio: 1; border-radius: 12px; overflow: hidden; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; }

        .insta-link {
          display: inline-block;
          margin-top: 1rem;
          color: #E1306C;
          font-weight: 700;
          text-decoration: none;
          font-size: 1.2rem;
        }

        /* Why Use Us */
        .why-us-section { padding: 4rem 0; background: var(--primary-green); color: white; }
        .why-us-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; }
        .why-card { text-align: center; }
        .check-icon { display: block; font-size: 1.5rem; background: var(--accent-gold); color: black; width: 40px; height: 40px; line-height: 40px; border-radius: 50%; margin: 0 auto 10px; }

        /* Contact */
        .contact-section { padding: 5rem 0; }
        .contact-card { background: var(--bg-light); padding: 3rem; border-radius: 24px; text-align: center; max-width: 600px; margin: 0 auto; }
        .owner-names { font-size: 1.3rem; margin-bottom: 1rem; font-weight: 700; color: var(--primary-green); }
        .whatsapp-btn { background: #25d366; color: white; padding: 1rem; display: block; border-radius: 12px; text-decoration: none; font-weight: 700; margin-top: 2rem; }

        .main-footer { text-align: center; padding: 3rem 0; border-top: 1px solid #eee; }
        .footer-logo-wrap { width: 50px; height: 50px; border-radius: 50%; overflow: hidden; margin: 0 auto 1rem; }
        .footer-logo { width: 100%; height: 100%; object-fit: cover; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-up { animation: fadeInUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }

        @media (max-width: 600px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-title { font-size: 2.2rem; }
        }
      `}</style>
        </div>
    );
};

export default Home;

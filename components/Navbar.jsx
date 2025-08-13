import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
// import AuthModal from '@/components/AuthModal'; // ❌ Commented modal import
import "../src/App.css";

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // ❌ Commented modal state
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // ❌ Modal control functions commented
  // const openAuthModal = () => {
  //   setIsAuthModalOpen(true);
  //   closeMenu();
  // };

  // const closeAuthModal = () => {
  //   setIsAuthModalOpen(false);
  // };

  const handleLogout = async () => {
    try {
      await signOut();
      closeMenu();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.navbar')) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navigateToSection = (section) => {
    closeMenu();
    if (window.location.pathname === "/") {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: section } });
    }
  };

  const getDisplayName = () => {
    if (profile?.name) return profile.name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  return (
    <>
      <nav className="navbar">
        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="#services" onClick={() => navigateToSection("services")}>Services</a>
          <a href="#courses" onClick={() => navigateToSection("courses")}>Learning Hub</a>
          <Link to="/" onClick={closeMenu}>Exam Builder</Link>
          <a href="https://skillzageresume.web.app/">
            Resume AI
          </a>

        </div>

        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Original login and signup buttons  */}
        {/* <div className="auth-buttons">
          {!user && (
            <>
              <button className="auth-btn login-btn" onClick={openAuthModal}>
                Log In
              </button>
              <button className="auth-btn register-btn" onClick={openAuthModal}>
                Join Now
              </button>
            </>
          )}
          {user && (
            <div className="user-menu">
              <span>Welcome, {getDisplayName()}</span>
              <button className="auth-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div> */}

        <div className="auth-buttons">
          {!user && (
            <>
              {/* Previously opened AuthModal — now replaced with redirect */}
              <button
                className="auth-btn login-btn"
                onClick={() => {
                  closeMenu();
                  navigate("/auth");
                }}
              >
                Login / Join Now
              </button>
            </>
          )}
          {user && (
            <div className="user-menu">
              <span>Welcome, {getDisplayName()}</span>
              <button className="auth-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* 🔒 Commented AuthModal section — still available for future use */}
      {/* 
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />
      */}
    </>
  );
};

export default Navbar;

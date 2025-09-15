import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import asklylogo from "../assets/asklylogo.png"
import LoginLogo from '../assets/LoginLogo.png'
import './Nav.css'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });

  const user = {
    name: "Abhishek",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    rollno: "0126CS231011"
  };

  return (
    <nav>
      {/* ✅ Navbar visible on mobile */}
      {!isDesktop && (
        <div className='navbar'>
          <i
            id='menu'
            className="ri-menu-line"
            onClick={() => setIsOpen(!isOpen)}
          ></i>
          <img id='ask' src={asklylogo} alt="Askly Logo" />
          <div className="nav-right">
            <i className="ri-notification-line"></i>
            <img
              className='profile'
              src={user.profilePic || "/default-profile.png"}
              alt={user.name}
            />
          </div>
        </div>
      )}

      {(isOpen || isDesktop) && (
        <div className={`right-sec ${isDesktop ? "" : (isOpen ? "slide-in" : "slide-out")}`}>
          <div className="pic">
            {isDesktop && <img src={LoginLogo} alt="logo" />}
            {!isDesktop && (
              <i
                onClick={() => setIsOpen(!isOpen)}
                className="ri-close-line"
              ></i>
            )}
          </div>

          <div className="right-sec-container">
            <div className="main-text">
              <p>Main</p>

              <NavLink to="/" className={({ isActive }) => isActive ? "active dash" : "dash"}>
                <i className="ri-dashboard-line"></i>
                <p>Dashboard</p>
              </NavLink>

              <NavLink to="/chat-ai" className={({ isActive }) => isActive ? "active chat-ai" : "chat-ai"}>
                <i className="ri-message-2-line"></i>
                <p>Chat AI</p>
              </NavLink>

              <NavLink to="/bulletin" className={({ isActive }) => isActive ? "active bullet" : "bullet"}>
                <i className="ri-book-open-line"></i>
                <p>Bulletin</p>
              </NavLink>

              <NavLink to="/scan-docs" className={({ isActive }) => isActive ? "active docs" : "docs"}>
                <i className="ri-camera-line"></i>
                <p>Scan Docs</p>
              </NavLink>

              <NavLink to="/whatsapp-bot" className={({ isActive }) => isActive ? "active chat" : "chat"}>
                <i className="ri-wechat-2-line"></i>
                <p>WhatsApp Bot</p>
              </NavLink>

              <NavLink to="/volunteers-help" className={({ isActive }) => isActive ? "active help" : "help"}>
                <i className="ri-wechat-line"></i>
                <p>Volunteers Help</p>
              </NavLink>

              <NavLink to="/about" className={({ isActive }) => isActive ? "active about" : "about"}>
                <i className="ri-notification-line"></i>
                <p>About Us</p>
              </NavLink>

              <NavLink to="/offline" className={({ isActive }) => isActive ? "active offline" : "offline"}>
                <i className="ri-wifi-off-line"></i>
                <p>Offline Mode</p>
              </NavLink>
            </div>

            <div className="upcoming-head">
              <p>Upcoming</p>
              <NavLink to="/ai-agent" className={({ isActive }) => isActive ? "active agent" : "agent"}>
                <i className="ri-computer-line"></i>
                <p>AI Agent</p>
              </NavLink>
            </div>

            <NavLink to="/settings" className={({ isActive }) => isActive ? "active setting" : "setting"}>
              <i className="ri-settings-2-line"></i>
              <p>Settings</p>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav

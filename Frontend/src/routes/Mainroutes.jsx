// src/routes/Mainroutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Dashboard from "../components/Dashboard.jsx";
import ChatAI from "../components/ChatAI.jsx";
import BulletBoard from "../components/BulletBoard.jsx";
import OfflineMode from "../components/OfflineMode.jsx";
import ScanDocs from "../components/ScanDocs.jsx";
import WhatsAppBot from "../components/WhatsAppBot.jsx";
import VolunteersHelp from "../components/VolunteersHelp.jsx";
import AboutUs from "../components/AboutUs.jsx";
import AIAgent from "../components/AIAgent.jsx";
import Settings from "../components/Settings.jsx";

const Mainroutes = () => {
  return (
    <Routes>
      {/* Public Routes (all visible) */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard title="Dashboard" />} />
      <Route path="/chat-ai" element={<ChatAI title="Chat AI" />} />
      <Route path="/bulletin" element={<BulletBoard title="Bullet Board" />} />
      <Route path="/offline" element={<OfflineMode title="Offline Mode" />} />
      <Route path="/scan-docs" element={<ScanDocs title="Scan Docs" />} />
      <Route path="/whatsapp-bot" element={<WhatsAppBot title="WhatsApp Bot" />} />
      <Route path="/volunteers-help" element={<VolunteersHelp title="Volunteers Help" />} />
      <Route path="/about" element={<AboutUs title="About Us" />} />
      <Route path="/ai-agent" element={<AIAgent title="AI Agent" />} />
      <Route path="/settings" element={<Settings title="Settings" />} />
    </Routes>
  );
};

export default Mainroutes;

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Mainroutes from "./routes/Mainroutes.jsx";
import "./App.css";
import { useAuth } from "./context/AuthContext.jsx";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const hideNavRoutes = ["/login", "/signup"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname.toLowerCase());

  // useEffect(() => {
  //   const publicRoutes = ["/", "/login", "/signup"];
  //   if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
  //     // Add a little delay for smooth transition
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 300);
  //   }
  // }, [isAuthenticated, location.pathname, navigate]);

  return (
    <div className="app-layout">
      {!shouldHideNav && <Nav />}

    
            <Mainroutes />
    </div>
  );
};

export default App;

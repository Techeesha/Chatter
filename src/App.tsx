import { useState, useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

// hooks
import { useAuthContext } from "./hooks/useAuthContext";
import { useTheme } from "./hooks/useTheme";

// pages, components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Analytic from "./pages/analytics/Analytics";
import Settings from "./pages/settings/Settings";
import Bookmark from "./pages/bookmark/Bookmark";
import Landing from "./pages/landing/Landing";
import Create from "./pages/create/Create";
import Home from "./pages/home/Home";
import Post from "./pages/post/Post";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Analytics from "./pages/analytics/Analytics";

function App() {
  const { user, authIsReady } = useAuthContext();

  // states
  const [mobileMenu, setMobileMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    // cleanup function
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <div className="App">
      {mobileMenu && (
        <div className="backdrop" onClick={() => setMobileMenu(false)}></div>
      )}
      {authIsReady && (
        <>
          {user && (
            <Sidebar
              screenWidth={screenWidth}
              mobileMenu={mobileMenu}
              setMobileMenu={setMobileMenu}
            />
          )}
          <div className="container">
            {user && (
              <Navbar
                screenWidth={screenWidth}
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
              />
            )}
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="posts"
                element={user ? <Home sw={screenWidth} /> : <Navigate to="/" />}
              >
                <Route
                  path=":id"
                  index
                  element={user ? <Post /> : <Navigate to="/" />}
                />
                <Route
                  path="analytics"
                  element={user ? <Analytics /> : <Navigate to="/" />}
                />
                <Route
                  path="analytics:id"
                  element={user ? <Analytic /> : <Navigate to="/" />}
                />
              </Route>
              <Route
                path="bookmarks"
                element={user ? <Bookmark /> : <Navigate to="/" />}
              />
              <Route
                path="create-post"
                element={user ? <Create /> : <Navigate to="/" />}
              />
              <Route
                path="login"
                element={!user ? <Login /> : <Navigate to="/posts" />}
              />
              <Route
                path="search"
                element={user ? <Search /> : <Navigate to="/" />}
              />
              <Route
                path="settings"
                element={user ? <Settings /> : <Navigate to="/" />}
              />
              <Route
                path="signup"
                element={!user ? <Signup /> : <Navigate to="/posts" />}
              />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

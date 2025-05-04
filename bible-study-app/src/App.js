import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import IdentitySection from "./components/IdentitySection";
import Footer from "./components/Footer";
import VideoSection from "./components/VideoSection";
import RecentDevotionals from "./components/RecentDevotionals";
import GetConnected from "./components/GetConnected";
import AboutUs from "./components/page/AboutUs";
import BlogPage from "./components/page/Blog";
import CategoryPage from "./components/page/CategoryPage";
import PostDetail from "./components/page/PostDetail";
import Media from "./components/page/PodcastPage";

import Sidebar from "./AdminDashboard/Sidebar";
import Dashboard from "./AdminDashboard/Dashboard";
import ManageBlogs from "./AdminDashboard/ManageBlogs";
import CreateBlog from "./AdminDashboard/CreateBlog";
import Login from "./pages/admin/Login";
import PrivateRoute from "./pages/admin/PrivateRoute";

import useIsMobile from "./useIsMobile"; // ✅ correct
import "./styles/dashboard.css";

function App() {
  const isMobile = useIsMobile(); // ✅ Detect screen size

  return (
    <Router>
      <Routes>
        {/* Public Website Pages */}
        <Route
          path="/*"
          element={
            <div>
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      {!isMobile && <FeatureCards />}
                      <IdentitySection />
                      <VideoSection />
                      <RecentDevotionals />
                      <GetConnected />
                    </>
                  }
                />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/Media" element={<Media />} />
              </Routes>
              {/* ✅ Show footer on all public pages */}
              <Footer />
            </div>
          }
        />

        {/* Protected Admin Panel */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <div className="admin-panel">
                <Sidebar />
                <div className="content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/manage" element={<ManageBlogs />} />
                    <Route path="/create" element={<CreateBlog />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

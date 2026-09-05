import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Problem from "./components/Problem";
import Product from "./components/Product";
import Efficiency from "./components/Efficiency";
import Landing from "./components/Landing"
import ContactBooking from "./components/ContactBooking";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Dashboard from "./components/Dashboard";
import ChatBot from "./components/ChatBot";
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  useEffect(() => {
    const reveals = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar
        auth={auth}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenDashboard={() => setDashboardOpen(true)}
      />
      <Hero />
      <Marquee />
      <Problem />
      <Product />
      <Efficiency />
      <Landing />
      <ContactBooking />
      <Footer />
      <ChatBot />

      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onLogin={async (email, password) => {
            await auth.login(email, password);
            setAuthModalOpen(false);
            setDashboardOpen(true);
          }}
          onSignup={auth.signup}
        />
      )}

      {dashboardOpen && auth.isLoggedIn && (
        <Dashboard
          user={auth.user}
          onPairDevice={auth.pairDevice}
          onLogout={() => {
            auth.logout();
            setDashboardOpen(false);
          }}
          onClose={() => setDashboardOpen(false)}
        />
      )}
    </>
  );
}

export default App;
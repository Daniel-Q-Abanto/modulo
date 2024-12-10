import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Services from './components/Services';
import Diseño from './components/Diseño';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Prompt from './components/Prompt';
import { scroller } from 'react-scroll';

const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 500,
        offset: -70, // Ajustar según la altura del header
      });
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <ScrollHandler /> {/* Maneja el scroll basado en el estado */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HowItWorks id="how-it-works" />
                <Diseño />
                <About id="about" />
                <Services id="services" />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prompts" element={<Prompt />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

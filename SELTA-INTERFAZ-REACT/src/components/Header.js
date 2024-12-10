import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
      color: #ff6868;
    }
  }
`;

const Button = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #e65555;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('access_token');

  const handleScrollToSection = (section) => {
    if (location.pathname !== '/') {
      // Redirigir a la página principal antes de hacer scroll
      navigate('/', { state: { scrollTo: section } });
    } else {
      // Hacer scroll directamente si ya estás en la página principal
      scroll.scrollTo(section);
    }
  };

  const handleExploreClick = () => {
    if (token) {
      navigate('/prompts');
    } else {
      navigate('/login', { state: { from: '/prompts' } });
    }
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>SELTA Confecciones</Logo>
      <Nav>
        <a onClick={() => handleScrollToSection('how-it-works')}>Inicio</a>
        <a onClick={() => handleScrollToSection('about')}>Acerca de</a>
        <a onClick={() => handleScrollToSection('services')}>Servicios</a>
        <Button onClick={handleExploreClick}>¡Comienza ya!</Button>
        {token && <Button onClick={() => navigate('/profile')}>Perfil</Button>}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

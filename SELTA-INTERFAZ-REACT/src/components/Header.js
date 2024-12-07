// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
`;

const Header = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Si existe un token, redirige al profile
      navigate('/profile');
    } else {
      // Si no hay token, redirige al login
      navigate('/login');
    }
  };

  return (
    <HeaderContainer>
      <Logo>SELTA Confecciones</Logo>
      <Nav>
        <a href="/">Inicio</a>
        <a href="/about">Acerca de</a>
        <a href="/services">Servicios</a>
        <Button onClick={handleButtonClick}>¡Comienza ya!</Button>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

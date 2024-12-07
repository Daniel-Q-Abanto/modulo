// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 20px;
  text-align: center;
  background-color: #333;
  color: white;
`;

const Footer = () => (
  <FooterContainer>
    <p>&copy; 2024 Selta Confecciones. Todos los derechos reservados.</p>
  </FooterContainer>
);

export default Footer;

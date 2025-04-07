import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 60px 40px 30px;
  text-align: center;
`;

const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media(min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const FooterColumn = styled.div`
  max-width: 300px;

  h4 {
    font-size: 1.1rem;
    margin-bottom: 15px;
    font-weight: bold;
    color: #f3f3f3;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 8px;
      font-size: 0.95rem;
      color: #ccc;
      cursor: pointer;

      &:hover {
        color: #fff;
      }
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  svg {
    color: #ccc;
    font-size: 1.3rem;
    transition: color 0.3s;

    &:hover {
      color: #fff;
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 40px;
  font-size: 0.85rem;
  color: #aaa;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterColumn>
          <h4>SELTΛ Confecciones</h4>
          <p>Diseños únicos para personas únicas. Personaliza tus prendas con estilo, calidad e innovación.</p>
        </FooterColumn>

        <FooterColumn>
          <h4>Enlaces útiles</h4>
          <ul>
            <li>Inicio</li>
            <li>Acerca de</li>
            <li>Servicios</li>
            <li>Contacto</li>
          </ul>
        </FooterColumn>

        <FooterColumn>
          <h4>Contáctanos</h4>
          <ul>
            <li>Email: contacto@selta.com</li>
            <li>Teléfono: +51 999 999 999</li>
            <li>Dirección: Lima, Perú</li>
          </ul>
        </FooterColumn>
      </FooterTop>

      <SocialIcons>
        <FaFacebookF />
        <FaInstagram />
        <FaTwitter />
        <FaEnvelope />
      </SocialIcons>

      <FooterBottom>
        &copy; {new Date().getFullYear()} Selta Confecciones. Todos los derechos reservados.
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

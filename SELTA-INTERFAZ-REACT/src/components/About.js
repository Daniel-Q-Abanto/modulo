// src/components/About.js
import React from 'react';
import styled from 'styled-components';
import hombreImage from '../assets/hombre.png';
import calidadIcon from '../assets/calidad.png';
import innovacionIcon from '../assets/innovacion.png';
import cuadritoImage from '../assets/cuadrito.png';

const AboutContainer = styled.section`
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const TextSection = styled.div`
  width: 40%;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  font-family: Arial, sans-serif;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const IconItem = styled.div`
  text-align: center;
  margin-right: 20px;

  img {
    width: 50px;
    height: auto;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
  }

  p {
    font-size: 0.9rem;
    color: #666;
    max-width: 120px;
  }
`;

// Agrandar `CuadritoImage` y centrarlo entre secciones
const CuadritoImage = styled.img`
  width: 120px; // Ajusta el tamaño según sea necesario
  height: auto;
  margin: 0 30px; // Ajusta el espacio horizontal si es necesario
`;

const ImageContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
`;

const ModeloContainer = styled.div`
  background-color: #dde7ee;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
`;

const About = () => (
  <AboutContainer>
    <TextSection>
      <Title>¿A qué nos dedicamos?</Title>
      <Description>
        En Selta Confecciones, nos especializamos en ofrecer opciones de personalización para prendas de vestir, utilizando tecnología avanzada e inteligencia artificial. Nuestro objetivo es ayudar a nuestros clientes a expresar su estilo personal de manera única y accesible. Nos esforzamos por ofrecer calidad, innovación y creatividad en cada diseño.
      </Description>
      <IconContainer>
        <IconItem>
          <img src={calidadIcon} alt="Calidad" />
          <h4>Calidad</h4>
          <p>Nos comprometemos a ofrecer productos de la más alta calidad.</p>
        </IconItem>
        <IconItem>
          <img src={innovacionIcon} alt="Innovación" />
          <h4>Innovación</h4>
          <p>Utilizamos tecnología avanzada para opciones únicas.</p>
        </IconItem>
      </IconContainer>
    </TextSection>
    <CuadritoImage src={cuadritoImage} alt="Decoración Cuadrito" /> {/* Imagen en el centro con tamaño mayor */}
    <ImageContainer>
      <ModeloContainer>
        <img src={hombreImage} alt="Modelo con camiseta" style={{ width: '100%', borderRadius: '15px' }} />
      </ModeloContainer>
    </ImageContainer>
  </AboutContainer>
);

export default About;

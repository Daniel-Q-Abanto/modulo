// src/components/HowItWorks.js
import React from 'react';
import styled from 'styled-components';
import imagenEjemplo from '../assets/tu-imagen.png'; // Asegúrate de que la imagen esté en assets

const HowItWorksContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 50px; // Espacio para centrar mejor en pantalla
  background-color: #f7f7f7;
`;

const TextSection = styled.div`
  flex: 1;
  max-width: 500px; // Limitar el ancho del texto
  text-align: left;
  padding-right: 40px; // Espacio entre texto y la imagen
`;

const Title = styled.h2`
  font-size: 3.5rem; // Aumenta el tamaño del título
  font-weight: bold;
  color: #333;
  font-family: 'Arial', sans-serif; // Cambia la fuente para hacerla más llamativa
  margin: 0;
`;

const Description = styled.p`
  font-size: 1.5rem; // Aumenta el tamaño del texto descriptivo
  color: #666;
  margin: 20px 0; // Ajusta el espaciado vertical
`;

const ExploreButton = styled.button`
  background-color: #e76f51;
  color: white;
  font-weight: bold;
  border: none;
  padding: 15px 30px; // Agranda el botón
  font-size: 1.2rem; // Aumenta el tamaño del texto del botón
  border-radius: 30px;
  cursor: pointer;
  margin-top: 20px;
  font-family: 'Arial', sans-serif;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 90%; // Ajusta el tamaño de la imagen
    max-width: 500px; // Limita el tamaño máximo de la imagen
    height: auto;
    border-radius: 10px;
  }
`;

const HowItWorks = () => (
  <HowItWorksContainer>
    <TextSection>
      <Title>¿Cómo funciona?</Title>
      <Description>Conoce cómo nuestra plataforma te ayuda a diseñar prendas únicas fácilmente.</Description>
      <ExploreButton>Explora la plataforma</ExploreButton>
    </TextSection>
    <ImageSection>
      <img src={imagenEjemplo} alt="Imagen de ejemplo" />
    </ImageSection>
  </HowItWorksContainer>
);

export default HowItWorks;

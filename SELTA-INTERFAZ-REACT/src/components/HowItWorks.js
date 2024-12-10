import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import imagenEjemplo from '../assets/tu-imagen.png'; // Asegúrate de que la imagen esté en assets

const HowItWorksContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 50px;
  background-color: #f7f7f7;
`;

const TextSection = styled.div`
  flex: 1;
  max-width: 500px;
  text-align: left;
  padding-right: 40px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin: 20px 0;
`;

const ExploreButton = styled.button`
  background-color: #e76f51;
  color: white;
  font-weight: bold;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 20px;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 90%;
    max-width: 500px;
    height: auto;
    border-radius: 10px;
  }
`;

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/prompts'); // Redirige al componente de prompts si está autenticado
    } else {
      navigate('/login'); // Redirige al login si no está autenticado
    }
  };

  return (
    <HowItWorksContainer id="how-it-works"> {/* ID necesario para scroll */}
      <TextSection>
        <Title>¿Cómo funciona?</Title>
        <Description>Conoce cómo nuestra plataforma te ayuda a diseñar prendas únicas fácilmente.</Description>
        <ExploreButton onClick={handleExploreClick}>Explora la plataforma</ExploreButton>
      </TextSection>
      <ImageSection>
        <img src={imagenEjemplo} alt="Imagen de ejemplo" />
      </ImageSection>
    </HowItWorksContainer>
  );
};

export default HowItWorks;

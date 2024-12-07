// src/components/Diseño.js
import React from 'react';
import styled from 'styled-components';
import polo1 from '../assets/polo1.png';
import polo2 from '../assets/polo2.png';
import polo3 from '../assets/polo3.png';

const DiseñoContainer = styled.section`
  background-color: #f3f3f3; // Color de fondo similar al de la imagen
  border-radius: 20px; // Bordes redondeados
  padding: 40px;
  margin: 50px auto;
  max-width: 1000px; // Ajuste de ancho máximo
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); // Sombra para destacar el cuadro
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  font-family: Arial, sans-serif;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const Step = styled.div`
  text-align: center;
  max-width: 200px;
`;

const StepImage = styled.img`
  width: 100px; // Tamaño de la imagen
  height: auto;
  margin-bottom: 10px;
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Diseño = () => (
  <DiseñoContainer>
    <Title>¿Cómo funciona tu diseño?</Title>
    <StepsContainer>
      <Step>
        <StepImage src={polo1} alt="Diseña tus prendas" />
        <StepTitle>1. Diseña tus prendas</StepTitle>
        <StepDescription>Personaliza tus prendas eligiendo tus propios diseños y estilos.</StepDescription>
      </Step>
      <Step>
        <StepImage src={polo2} alt="Revisa o Decide" />
        <StepTitle>2. Revisa o Decide</StepTitle>
        <StepDescription>Elige entre diferentes opciones de diseño y visualiza cómo quedará tu prenda.</StepDescription>
      </Step>
      <Step>
        <StepImage src={polo3} alt="Disfruta tu Estilo" />
        <StepTitle>3. Disfruta tu Estilo</StepTitle>
        <StepDescription>Recibe tu prenda personalizada y luce un estilo único diseñado por ti.</StepDescription>
      </Step>
    </StepsContainer>
  </DiseñoContainer>
);

export default Diseño;

// src/components/Diseño.js
import React from 'react';
import styled from 'styled-components';
import polo1 from '../assets/polo1.png';
import polo2 from '../assets/polo2.png';
import polo3 from '../assets/polo3.png';

const DiseñoWrapper = styled.section`
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  padding: 50px 20px;
`;

const DiseñoContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 25px;
  padding: 50px 60px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1400px;
  border: 2px solid rgb(242, 247, 255);
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 900;
  color: #222;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const Step = styled.div`
  text-align: center;
  max-width: 250px;
`;

const StepImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 15px;
`;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: #111;
  margin-bottom: 8px;
`;

const StepDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
`;

const Diseño = () => (
  <DiseñoWrapper>
    <DiseñoContainer>
      <Title>¿CÓMO FUNCIONA TU DISEÑO?</Title>
      <StepsContainer>
        <Step>
          <StepImage src={polo1} alt="Diseña tus prendas" />
          <StepTitle>DISEÑA TUS PRENDAS</StepTitle>
          <StepDescription>Personaliza tus prendas eligiendo tus propios diseños y estilos.</StepDescription>
        </Step>
        <Step>
          <StepImage src={polo2} alt="Revisa o Decide" />
          <StepTitle>REVISA O DECIDE</StepTitle>
          <StepDescription>Elige entre diferentes opciones de diseño y visualiza cómo quedará tu prenda.</StepDescription>
        </Step>
        <Step>
          <StepImage src={polo3} alt="Disfruta tu Estilo" />
          <StepTitle>DISFRUTA TU ESTILO</StepTitle>
          <StepDescription>Recibe tu prenda personalizada y luce un estilo único diseñado por ti.</StepDescription>
        </Step>
      </StepsContainer>
    </DiseñoContainer>
  </DiseñoWrapper>
);

export default Diseño;

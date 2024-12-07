// src/components/Services.js
import React from 'react';
import styled from 'styled-components';

const ServicesContainer = styled.section`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Services = () => (
  <ServicesContainer>
    <Title>Nuestros Servicios</Title>
    {/* Aquí podrías agregar una lista de servicios o tarjetas si necesitas más detalles */}
  </ServicesContainer>
);

export default Services;

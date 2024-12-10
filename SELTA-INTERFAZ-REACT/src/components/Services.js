import React from 'react';
import styled from 'styled-components';

const ServicesContainer = styled.section`
  padding: 50px;
  text-align: center;
  background-color: #f1f1f1;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ServiceDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #666;
`;

const Services = () => (
  <ServicesContainer id="services"> {/* ID necesario para scroll */}
    <Title>Nuestros Servicios</Title>
    <ServiceDescription>
      Descubre los servicios que ofrecemos para ayudarte a personalizar tus diseños únicos:
      <ul>
        <li>Diseño personalizado de prendas.</li>
        <li>Asesoría en tendencias de moda.</li>
        <li>Producción de alta calidad.</li>
        <li>Entrega rápida y eficiente.</li>
      </ul>
    </ServiceDescription>
  </ServicesContainer>
);

export default Services;

import React from 'react';
import styled from 'styled-components';
import mockup1 from '../assets/mockup1.png';
import mockup2 from '../assets/mockup2.png';
import mockup3 from '../assets/mockup3.png';
import mockup4 from '../assets/mockup4.png';

const ServicesSection = styled.section`
  background: linear-gradient(to bottom, #fff, #f1f5f9);
  padding: 100px 20px;
  width: 100%;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  color: #222;
  margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 40px;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 18px;
  padding: 30px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: #1f2937;
  text-transform: uppercase;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: #555;
  text-align: center;
  margin-bottom: 25px;
  flex-grow: 1;
`;

const Button = styled.button`
  background-color: #c86d6d;
  color: white;
  border: none;
  padding: 10px 25px;
  font-size: 0.9rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #b15353;
  }
`;

const Services = () => {
  return (
    <ServicesSection id="services">
      <ContentWrapper>
        <Title>NUESTROS SERVICIOS</Title>
        <Description>
          Descubre los servicios que ofrecemos para ayudarte a personalizar tus diseños únicos.
        </Description>
        <CardsGrid>
          <Card>
            <ServiceImage src={mockup1} alt="Personalización completa" />
            <CardTitle>Personalización</CardTitle>
            <CardText>
              Listas únicas para expresar estilo propio, optimizadas para cada ocasión.
            </CardText>
            <Button>Ver más</Button>
          </Card>
          <Card>
            <ServiceImage src={mockup2} alt="Confección digital" />
            <CardTitle>Confección Digital</CardTitle>
            <CardText>
              Técnicas modernas para prendas personalizadas, listas para lucir.
            </CardText>
            <Button>Ver más</Button>
          </Card>
          <Card>
            <ServiceImage src={mockup3} alt="Estilo de visita casual" />
            <CardTitle>Visita Casual</CardTitle>
            <CardText>
              Prendas versátiles para todas las ocasiones y estilos de vida.
            </CardText>
            <Button>Ver más</Button>
          </Card>
          <Card>
            <ServiceImage src={mockup4} alt="Color y estilo de vida" />
            <CardTitle>Color y Estilo</CardTitle>
            <CardText>
              Líneas estructuradas para crear looks únicos con esencia propia.
            </CardText>
            <Button>Ver más</Button>
          </Card>
        </CardsGrid>
      </ContentWrapper>
    </ServicesSection>
  );
};

export default Services;

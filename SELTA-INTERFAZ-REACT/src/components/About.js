import React from 'react';
import styled from 'styled-components';
import calidadIcon from '../assets/calidad.png';
import innovacionIcon from '../assets/innovacion.png';
import creatividadIcon from '../assets/creatividad.png'; // Imagen nueva sugerida

const AboutSection = styled.section`
  background: linear-gradient(to right, #ffe5e5, #ffffff);
  padding: 100px 40px;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 900;
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 25px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #444;
  max-width: 1000px;
  margin: 0 auto 60px;
  line-height: 1.8;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 75px;
    height: auto;
    margin-bottom: 20px;
  }

  h4 {
    font-size: 1.5rem;
    color: #c86d6d;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
`;

const About = () => {
  return (
    <AboutSection>
      <Container>
        <Title>¿A qué nos dedicamos?</Title>
        <Description>
          En Selta Confecciones, brindamos soluciones inteligentes de personalización de prendas
          con ayuda de la inteligencia artificial. Nuestra misión es fusionar tecnología y creatividad
          para ofrecer productos que reflejen tu estilo único de forma original, creativa y accesible.
        </Description>

        <CardsContainer>
          <Card>
            <img src={calidadIcon} alt="Calidad" />
            <h4>Calidad</h4>
            <p>
              Nos comprometemos a ofrecer productos de alta calidad, cuidando cada detalle en el proceso.
            </p>
          </Card>

          <Card>
            <img src={innovacionIcon} alt="Innovación" />
            <h4>Innovación</h4>
            <p>
              Aplicamos tecnología avanzada para brindarte diseños únicos y personalizables al instante.
            </p>
          </Card>

          <Card>
            <img src={creatividadIcon} alt="Creatividad" />
            <h4>Creatividad</h4>
            <p>
              Queremos que cada diseño exprese quién eres. Diseña libremente y refleja tu estilo sin límites.
            </p>
          </Card>
        </CardsContainer>
      </Container>
    </AboutSection>
  );
};

export default About;

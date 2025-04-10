import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import mockup1 from '../assets/mockup1.png';

const Container = styled.div`
  background-color: #eef2f7;
  padding: 30px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

const Sidebar = styled.div`
  width: 250px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const Center = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MockupImage = styled.img`
  max-height: 400px;
  z-index: 1;
`;

const UploadedImage = styled.img`
  position: absolute;
  max-width: 150px;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Controls = styled.div`
  width: 250px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const BackButton = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #ff6868;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Personalizar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;

  return (
    <Container>
      <Title>Personalizar</Title>
      <Content>
        <Sidebar>
          <h4>TIPO DE CAMISETA</h4>
          <ul>
            <li>Básica</li>
            <li>Cuello redondo</li>
            <li>Cuello en V</li>
            <li>Manga larga</li>
          </ul>
          <h4 style={{ marginTop: '20px' }}>MODELO</h4>
          <p>Opciones de modelo y color aquí</p>
        </Sidebar>

        <Center>
          <MockupImage src={mockup1} alt="Mockup" />
          {image && <UploadedImage src={image} alt="Subida" />}
        </Center>

        <Controls>
          <h4>Finalizar diseño</h4>
          <p>Selector de colores e intensidad</p>
        </Controls>
      </Content>

      <BackButton onClick={() => navigate('/prompts')}>Volver a generar</BackButton>
    </Container>
  );
};

export default Personalizar;

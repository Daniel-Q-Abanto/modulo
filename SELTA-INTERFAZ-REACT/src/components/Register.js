import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/loginimage.png';

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${loginImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6868;
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 8px;
  outline: none;
`;

const Button = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
`;

const LinkText = styled.p`
  font-size: 0.9rem;
  color: #fff;
  margin-top: 15px;

  a {
    color: #ff6868;
    font-weight: bold;
    text-decoration: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
    nombre_usuario: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registro exitoso');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.detail || 'Error al registrar');
      }
    } catch (error) {
      setError('Error en el servidor. Intenta más tarde.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Background>
      <GlassCard>
        <Title>Regístrate</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="nombre_usuario"
            placeholder="Nombre de usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Registrarse</Button>
        </Form>
        <LinkText>
          ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </LinkText>
      </GlassCard>
    </Background>
  );
};

export default Register;

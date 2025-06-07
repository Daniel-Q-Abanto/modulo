import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
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

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        const redirectPath = location.state?.from || '/prompts';
        navigate(redirectPath);
      } else {
        setError('Credenciales incorrectas. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Background>
      <GlassCard>
        <Title>Iniciar Sesión</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Iniciar Sesión</Button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </Form>
        <LinkText>
          ¿No tienes una cuenta? <a href="/register">Regístrate</a>
        </LinkText>
      </GlassCard>
    </Background>
  );
};

export default Login;

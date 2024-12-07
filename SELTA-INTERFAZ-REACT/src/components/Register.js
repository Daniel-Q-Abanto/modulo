// src/components/Register.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    outline: none;
    border-color: #ff6868;
  }
`;

const Button = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #e65555;
  }
`;

const LinkText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;

  a {
    color: #ff6868;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -10px;
`;

const Register = () => {
  const [formData, setFormData] = useState({ correo: '', contraseña: '', nombre_usuario: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetea el mensaje de error

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
        navigate('/login'); // Redirige al login después de registrarse
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
    <RegisterContainer>
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
    </RegisterContainer>
  );
};

export default Register;

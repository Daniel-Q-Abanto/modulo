import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e05050;
  }
`;

const ImagenGenerada = styled.img`
  margin-top: 25px;
  max-width: 100%;
  border-radius: 10px;
`;

const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generarImagen = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://localhost:8000/api/generar-imagen/',
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const imageUrl = response.data.imagen_url;
      if (imageUrl) {
        setImagenUrl(imageUrl);
      } else {
        alert('No se encontró imagen para este prompt.');
      }
    } catch (error) {
      console.error('Error al generar imagen:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Ocurrió un error al generar la imagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Genera una imagen con IA</Title>
      <Input
        rows="4"
        placeholder="Ejemplo: perro, gato, galaxia, montaña..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={generarImagen} disabled={loading}>
        {loading ? 'Generando...' : 'Generar Imagen'}
      </Button>

      {imagenUrl && (
        <ImagenGenerada src={imagenUrl} alt="Imagen generada por IA" />
      )}
    </Container>
  );
};

export default Prompt;

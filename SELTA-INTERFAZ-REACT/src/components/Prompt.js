import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin: 10px;

  &:hover {
    background-color: #e05050;
  }
`;

const ImagenWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagenGenerada = styled.img`
  width: 100%;
  max-width: 400px;
  height: 400px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background: #f2f2f2;
`;

const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [localImage, setLocalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        setLocalImage(null);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalImage(imageUrl);
      setImagenUrl('');
    }
  };

  const irAPersonalizar = () => {
    const imagenSeleccionada = imagenUrl || localImage;
    navigate('/Personalizar', { state: { image: imagenSeleccionada } });
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
      <div>
        <Button onClick={generarImagen} disabled={loading}>
          {loading ? 'Generando...' : 'Generar Imagen'}
        </Button>
        <label htmlFor="upload-image">
          <Button as="span">Subir Imagen</Button>
        </label>
        <FileInput
          id="upload-image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {(imagenUrl || localImage) && (
        <ImagenWrapper>
          <ImagenGenerada src={imagenUrl || localImage} alt="Vista previa" />
          <Button onClick={irAPersonalizar}>Personalizar diseño</Button>
        </ImagenWrapper>
      )}
    </Container>
  );
};

export default Prompt;